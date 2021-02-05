from django.shortcuts import render
from .models import Vegetable, Harvest, Transaction, PurchasedItem, StockedVegetable
from .serializers import VegetableSerializer, HarvestSerializer, TransactionSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import MultipleObjectsReturned

import json

def index(request):
    return render(request, "index.html")

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
        'Create purchase': '/create-purchase'
    }

    return Response(apiUrls)

### vegetable api
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

    return Response(serializer.data)


#TODO: This is not working.
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


### harvest api
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
    serializer = HarvestSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def DeleteHarvest(request, pk):
    itemToDelete = Harvest.objects.get(id=pk)
    itemToDelete.delete()

    return Response("Item deleted")

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UserTransactions(request, pk):
    transactions = Transaction.objects.get(user_id=pk)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def SearchVegetables(request, pk):
    items = Vegetable.objects.all().filter(name__icontains=pk)
    serializer = VegetableSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
def CreatePurchase(request):
    # recieve vegetable name and quantity
    # query from stocked vegetable (assume 1 stock contains enough veg)
    # algo for total_amount
    # which vegetable to give them (stock) - decider
    # get data, for each item, find which stock to use and then add that
    # to the purchase item table, decrease quantity in stocked vegetable
    # create one single entry in transaction table, link everything to this entry
    body = json.loads(request.body)
    # for loop through the data
    for veg in body["veggies"]:
        print(veg)
        try:
            stocked = StockedVegetable.objects.get(name=veg["name"])
            # Get the price from prices table, use in the create Purchase
            # price = Prices.objects.get()
            quantity = veg["amount"]
            # Replace total_amount with price*quantity
            purchase = PurchasedItem.objects.create(food_quantity=quantity,
                        total_amount=50, stocked_vegetable=stocked)
            print(purchase.id)
            # Remove amount from StockedVegetable
            stocked.remove_quantity(quantity)

            # transaction = Transaction.objects.create(purchased_item=purchase,
            # user_id=request.user, is_complete=True, is_paid=True,
            # method_of_payment="credit")

        except ObjectDoesNotExist:
            print("There is no stocked " + veg["name"])
        except MultipleObjectsReturned:
            print("Multiple " + veg["name"] + " please select one to start.")

    # https://docs.djangoproject.com/en/3.0/topics/db/models/
    # create one transaction for multiple purchases

    return Response("Transaction recieved")
    # create JSON response that gets returned, that includes transaction.id

    # postman body
#     {
#     "veggies": [
#         {
#             "name": "Celery",
#             "amount": 1
#         },
#         {
#             "name": "Cucumber",
#             "amount": 2
#         },
#         {
#             "name": "Kale",
#             "amount": 5
#         }
#     ]
# }