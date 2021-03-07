from django.shortcuts import render
from .models import Vegetable, Harvest, Transaction, PurchasedItem, StockedVegetable, UserProfile
from .serializers import VegetableSerializer, HarvestSerializer, TransactionSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.exceptions import ParseError, ValidationError
import pandas as pandas

from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import MultipleObjectsReturned

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
import json
from django.utils.crypto import get_random_string
import base64
import uuid

@api_view(['GET'])
def apiOverview(request):
    apiUrls = {
        'List all vegetables': '/list-vegetables',
        'Create': '/create-vegetable',
        'Update': '/update-vegetable/<str:pk>',
        'Delete': '/delete-vegetable/<str:pk>',
        'List all harvests': '/list-harvests',
        'Create harvest': '/create-harvest',
        'Delete harvest': '/delete-harvest/<str:pk>',
        'List user transactions': '/list-transactions/<str:pk>',
        'Create purchase': '/create-purchase',
        'Add product': '/add-product',
    }
    return Response(apiUrls)


################################### UTILITIES ###################################
def create_harvest(cols):
    harvest_dict = {'farm_name': cols['farm'][0]}
    harvest_serializer = HarvestSerializer(data=harvest_dict)
    if harvest_serializer.is_valid():
        harvest_serializer.save()
    return harvest_serializer

def create_vegetables(cols):
    for vegetable_name in cols['item']:
        vegetable_dict = {'name': vegetable_name}
        serializer = VegetableSerializer(data=vegetable_dict)
        if serializer.is_valid():
            serializer.save()

def validate_harvest_spreadsheet(cols):
    return (('farm' in cols) and ('item' in cols) and ('quantity' in cols) \
            and len(cols['farm']) == len(cols['item']) \
            and len(cols['item']) == len(cols['quantity']) \
            and len(cols['quantity']) != 0)





################################### USER VIEWS ###################################
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
    user.email_user("New Account!!!", uName+' '+password)
    UserProfile.objects.create(user=user, loggedInOnce=False, isGSAdmin=(userType=='GA'))
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





################################### TRANSACTION VIEWS ###################################
@api_view(['POST'])
def CreatePurchase(request):
    body = json.loads(request.body)
    user = User.objects.get(username='theohenry')
    transaction = Transaction.objects.create(
                user_id=user,
                is_complete=body["transaction"]["is_complete"],
                is_paid=body["transaction"]["is_paid"],
                method_of_payment=body["transaction"]["method_payment"])

    valid_veg = []

    for veg in body["veggies"]:
        stocked = StockedVegetable.objects.filter(vegetable__name__contains=veg["name"]).order_by('-quantity')
        quantity = veg["amount"]
        if stocked.exists():
            done = False
            for stock in stocked:
                if not done:
                    amount = quantity if stock.get_quantity() > quantity else stock.get_quantity()
                    stock.remove_quantity(amount)
                    quantity-=amount
                    if quantity <= 0:
                        done = True
            amount_purchased = veg["amount"] if done else veg["amount"]-quantity
            purchase = PurchasedItem.objects.create(
                transaction=transaction,
                food_quantity=amount_purchased,
                total_amount=10,
                stocked_vegetable=stock)

    return Response(transaction.id)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UserTransactions(request, pk):
    transactions = Transaction.objects.get(user_id=pk)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)





################################### HARVEST VIEWS ###################################
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def ListHarvests(request):
    items = Harvest.objects.all()
    serializer = HarvestSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def CreateHarvest(request):
    # read the spreadsheet
    spreadsheet = request.FILES['file']
    cols = pandas.read_excel(spreadsheet)
    # create a dictionary representation of it
    if validate_harvest_spreadsheet(cols):
        serializer = create_harvest(cols)
        create_vegetables(cols)
        return Response(serializer.data)
    else:
        return ValidationError("invalid spreadsheet!")

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def DeleteHarvest(request, pk):
    itemToDelete = Harvest.objects.get(id=pk)
    itemToDelete.delete()

    return Response("Item deleted")





################################### VEGETABLE VIEWS ###################################
@api_view(['GET'])
def ListVegetables(request):
    items = Vegetable.objects.all()
    serializer = VegetableSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def CreateVegetable(request):
    serializer = VegetableSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print("invalid data")

    return Response(serializer.data)

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UpdateVegetable(request, pk):
    itemToUpdate = Vegetable.objects.get(id=pk)
    serializer = VegetableSerializer(instance=itemToUpdate, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def DeleteVegetable(request, pk):
    itemToDelete = Vegetable.objects.get(id=pk)
    itemToDelete.delete()

    return Response("Item deleted")

@api_view(['GET'])
def SearchVegetables(request, pk):
    items = Vegetable.objects.all().filter(name__icontains=pk)
    serializer = VegetableSerializer(items, many=True)
    return Response(serializer.data)





################################### PRODUCT VIEWS ###################################
@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def AddProduct(request):
    body = json.loads(request.body, strict=False)
    ptype = body['type']

    # decode the base64 image, and replace the 'image'
    # field with its corresponding file name
    img, file_name = decode_base64_image(body['photo'])
    request.data.update({"photo": file_name})
    
    if ptype == 0: # type 0 = produce
        serializer = VegetableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            fout = open(file_name, 'wb')
            fout.write(img)
            fout.close()
        return Response(data=serializer.data)
    # elif ptype == 1: # type 1 = merchandise
    #     serializer = VegetableSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         fout = open(file_name, 'wb')
    #         fout.write(img)
    #         fout.close()
    #     return Response(data=serializer.data)
    else: # if product type is invalid
        err_msg = "Invalid product type '%s'. Expected 'produce' or 'merchandise'." % ptype
        return ParseError(err_msg)



# CreatePurchase
# Algorithm: Recieves transaction and list of vegetables. Creates
#            a transaction and adds requested vegetables that are stocked.
#            Decrease quantity in stocked vegetable
#
# Request parameters: transaction with is_complete, is_paid, method_payment
#                     veggies (array) - name, amount
#
# Qualifications: Assumes that all stocks combined contains sufficient quantity.
#                 Does not account for multiple vegetable stocks.
#                 Does not calculate actual vegetable price for purchase


# Decodes a base64 image, creates a unique file name to save it under,
# and returns a tuple that consists of (image, file name).
# Note that this doesn't create any files. In many scenarios, there's
# some kind of data you need to validate before saving the image (e.g. serializing
# request data), so it would be a waste to save images for invalid entries
# that aren't saved in the database.
def decode_base64_image(image64):
    # image_decoded = base64.decodestring(image64)
    image_decoded = base64.b64decode(image64)
    file_name = 'public/static/images/' + uuid.uuid4().hex
    return (image_decoded, file_name)

