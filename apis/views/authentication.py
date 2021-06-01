from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from apis.models import UserProfile
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.utils.crypto import get_random_string
from django.template.loader import render_to_string

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def GetUser(request):
    user = request.user
    return Response({'isAdmin': user.userprofile.isGSAdmin,
                    'activated': user.userprofile.loggedInOnce})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def AddUser(request):
    email, userType = request.data['email'], request.data['type']
    uName = get_random_string(10)
    password = get_random_string(10)
    user = User.objects.create_user(uName, email, password)
    email_body = render_to_string('SendEmail.html', {'username': uName, 'password': password, 'usertype': userType })
    user.email_user("New User Account for Groundwork Somerville marketplace", email_body)
    UserProfile.objects.create(
        user=user, loggedInOnce=False, isGSAdmin=(userType == 'GA'))
    return Response(status=200)


@api_view(['POST'])
def ChangePassword(request):
    user = request.user
    if user.check_password(request.data['oldPass']):
        user.username = request.data['newUname']
        user.set_password(request.data['newPass'])
        user.userprofile.loggedInOnce = True
        user.userprofile.save()
        user.save()
        return Response(status=200)
    else:
        return Response(status=403)


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key,
                        'isAdmin': user.userprofile.isGSAdmin,
                         'activated': user.userprofile.loggedInOnce})


login = Login.as_view()
