from django.shortcuts import render
from .models import Vegetable
from .serializers import VegetableSerializer
 

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def apiOverview(request):
    api_Urls = {
        'List all vegetables': '/list-vegetables',
        'Create': '/create-vegetable',
        'Delete': '/delete-vegetable/<str:pk>',
    }

    return Response(api_Urls)

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