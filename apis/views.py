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
    spreadsheet = request.FILES['file']
    spreadsheet_data = pandas.read_excel(spreadsheet)
    print("filename: ", spreadsheet)
    print("data: ", spreadsheet_data)
    return Response("uploaded data from spreadsheet")
    # serializer = HarvestSerializer(data=request.data)

    # if serializer.is_valid():
    #     serializer.save()

    # return Response(serializer.data)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def DeleteHarvest(request, pk):
    itemToDelete = Harvest.objects.get(id=pk)
    itemToDelete.delete()

    return Response("Item deleted")
