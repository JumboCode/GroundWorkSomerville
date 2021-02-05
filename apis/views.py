from django.shortcuts import render
from .models import Vegetable, Harvest
from .serializers import VegetableSerializer, HarvestSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
import pandas as pandas


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
    }

    return Response(apiUrls)


### vegetable api
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
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

def create_vegetables(cols):
    pass

def create_harvest(cols):
    harvest_dict = {'farm_name': cols['farm'][0]}
    # make the harvest serializer
    harvest_serializer = HarvestSerializer(data=harvest_dict)
    if harvest_serializer.is_valid():
        harvest_serializer.save()
    print(harvest_serializer)
    # serialize the vegetables types
    # serialize the stocked vegetables
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
