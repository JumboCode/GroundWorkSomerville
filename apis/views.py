from django.shortcuts import render
from .models import Vegetable, Harvest
from .serializers import VegetableSerializer, HarvestSerializer
 

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def apiOverview(request):
    apiUrls = {
        'List all vegetables': '/list-vegetables',
        'Create': '/create-vegetable',
        'Delete': '/delete-vegetable/<str:pk>',
    }

    return Response(apiUrls)

### vegetable api
@api_view(['GET'])
def ListVegetables(request):
    items = Vegetable.objects.all()
    serializer = VegetableSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def CreateVegetable(request):
    serializer = VegetableSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def DeleteVegetable(request, pk):
    itemToDelete = Vegetable.objects.get(id=pk)
    itemToDelete.delete()

    return Response("Item deleted")


### harvest api
@api_view(['POST'])
def CreateHarvest(request):
    serializer = HarvestSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save

    return Response(serializer.data)
