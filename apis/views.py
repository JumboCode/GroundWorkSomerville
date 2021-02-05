from django.shortcuts import render
from .models import Vegetable, Harvest, Transaction, PurchasedItem, StockedVegetable
from .serializers import VegetableSerializer, HarvestSerializer, TransactionSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import MultipleObjectsReturned

from django.contrib.auth.models import User

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
@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
def CreatePurchase(request):
    body = json.loads(request.body)
    user = User.objects.get(username='theohenry')
    # once authenticated users, change to -> user_id=request.user
    transaction = Transaction.objects.create(
                user_id=user,
                is_complete=body["transaction"]["is_complete"],
                is_paid=body["transaction"]["is_paid"],
                method_of_payment=body["transaction"]["method_payment"])

    valid_veg = []
    print(body["veggies"])
    for veg in body["veggies"]:
        stocked = StockedVegetable.objects.filter(name=veg["name"]).order_by('-quantity')
        print(stocked)
        quantity = veg["amount"]
        if stocked.exists():
            done = False
            for stock in stocked:
                if not done:
                    # remove requested amount if surplus. Remove all if deficit
                    amount = quantity if stock.get_quantity() > quantity else stock.get_quantity()
                    stock.remove_quantity(amount)
                    quantity-=amount
                    # stock has enough to complete transaction
                    if quantity <= 0:
                        done = True
                    # if stock.get_quantity() == 0:
                    #     stock.delete()

            # Get the price from prices table, use in the create Purchase
            # price = Prices.objects.get()
            # Replace total_amount with price*quantity
            amount_purchased = veg["amount"] if done else veg["amount"]-quantity
            purchase = PurchasedItem.objects.create(
                transaction=transaction,
                food_quantity=amount_purchased,
                total_amount=10,
                stocked_vegetable=stock)

    return Response(transaction.id)

# sample request
# {
#     "transaction": {
#         "is_complete": true,
#         "is_paid": true,
#         "method_payment": "credit"
#     },
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