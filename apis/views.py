from django.shortcuts import render
from .models import Vegetable, Harvest, Transaction, PurchasedItem, StockedVegetable
from .serializers import VegetableSerializer, HarvestSerializer, TransactionSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
import pandas as pandas

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


def create_vegetables(cols):
    pass

def create_harvest(cols):
    harvest_dict = {'farm_name': cols['farm'][0]}
    harvest_serializer = HarvestSerializer(data=harvest_dict)
    if harvest_serializer.is_valid():
        harvest_serializer.save()
    return harvest_serializer


def validate_harvest_spreadsheet(cols):
    return (('farm' in cols) and ('item' in cols) and ('quantity' in cols) \
            and len(cols['farm']) == len(cols['item']) \
            and len(cols['item']) == len(cols['quantity']) \
            and len(cols['quantity']) != 0)


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
        stocked = StockedVegetable.objects.filter(name=veg["name"]).order_by('-quantity')
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

@api_view(['POST'])
# TODO: once you get file uploads working, turn auth back on
# and then figure out how to authenticate in the FE
#@authentication_classes([SessionAuthentication, BasicAuthentication])
#@permission_classes([IsAuthenticated])
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
        # TODO: use an error response
        return Response("invalid spreadsheet!")