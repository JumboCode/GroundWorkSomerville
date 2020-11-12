from django.shortcuts import render
from .models import Vegetable, Harvest
from .serializers import VegetableSerializer, HarvestSerializer

# import custom decorators for authentication and permissions
from .decorators import user_loggedin, allowed_users

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response


@api_view(['GET'])
@user_loggedin
@allowed_users(allowed_roles=['admin'])
def apiOverview(request):
    apiUrls = {
        'List all vegetables': '/list-vegetables',
        'Create': '/create-vegetable',
        'Update': '/update-vegetable/<str:pk>',
        'Delete': '/delete-vegetable/<str:pk>',
        'List all harvests': '/list-harvests',
        'Create harvest': '/create-harvest',
        'Delete harvest': '/delete-harvest/<str:pk>',
    }

    return Response(apiUrls)

### vegetable api
@api_view(['GET'])
@user_loggedin
@allowed_users(allowed_roles=['admin','mobile_market','shc'])
def ListVegetables(request):
    items = Vegetable.objects.all()
    serializer = VegetableSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@user_loggedin
@allowed_users(allowed_roles=['admin'])
def CreateVegetable(request):
    serializer = VegetableSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


#TODO: This is not working. 
@api_view(['PUT'])
@user_loggedin
@allowed_users(allowed_roles=['admin'])
def UpdateVegetable(request, pk):
    itemToUpdate = Vegetable.objects.get(id=pk)
    serializer = VegetableSerializer(instance=itemToUpdate, data=request.data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
@user_loggedin
@allowed_users(allowed_roles=['admin'])
def DeleteVegetable(request, pk):
    itemToDelete = Vegetable.objects.get(id=pk)
    serializer = VegetableSerializer(itemToDelete)
    itemToDelete.delete()
 
    return Response(serializer.data)

### harvest api
@api_view(['GET'])
@user_loggedin
@allowed_users(allowed_roles=['admin'])
def ListHarvests(request):
    items = Harvest.objects.all()
    serializer = HarvestSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@user_loggedin
@allowed_users(allowed_roles=['admin'])
def CreateHarvest(request):
    serializer = HarvestSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
@user_loggedin
@allowed_users(allowed_roles=['admin'])
def DeleteHarvest(request, pk):
    itemToDelete = Harvest.objects.get(id=pk)
    serializer = HarvestSerializer(itemToDelete)
    itemToDelete.delete()

    return Response(serializer.data)


#TODO: Create new route called createUser, it first creates, then assigns user into a user group

# create the user 
# get or create a group

# assign user to group
#from django.contrib.auth.models import Group
#my_group = Group.objects.get(name='my_group_name') 
#my_group.user_set.add(your_user)



