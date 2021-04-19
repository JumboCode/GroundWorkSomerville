from apis.models import Vegetable, Harvest, Merchandise, MerchandisePrice
from apis.models import PurchasedItem, VegetablePrice, StockedVegetable
from apis.models import VegetableType
from apis.serializers import HarvestSerializer, VegetableSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, ParseError
from apis.views.utilities import decode_base64_image
import json


def dummy_view(request):
    return Response({"empty": []})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def StockVegetable(request):
    if not request.data:
        return Response("Missing information. The api requires start date and end date.")
    else:
        startdate = request.data['start_date']
        enddate = request.data['end_date']
        harvest = Harvest.objects.filter(
            date__range=[startdate, enddate]).first()
        stockedvegetables = StockedVegetable.objects.filter(
            harvested_on=harvest)
        return_list = []
        for stocked in stockedvegetables:
            item = PurchasedItem.objects.filter(
                stockedvegetables=stocked).first()
            vegetable = stocked.vegetable
            price = VegetablePrice.objects.filter(
                vegetable=vegetable).latest('updated_on')  # depends if the selection is old, can't be latest

            return_list.append(
                {
                    name: vegetable.name,
                    total_available: stocked.quantity,
                    unit: vegetable.unit,
                    total_sold: item.total_amount,
                    price: price.price
                })

        return Response(return_list)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def StockMerchandise(request):
    return_list = []
    for merch in Merchandise.objects.all():
        item = PurchasedItem.objects.filter(
            merchandise=merch).aggregate(total_sold=sum('total_amount'))
        price = MerchandisePrice.objects.filter(
            merchandise=merch).latest('updated_on')  # depends if the selection is old, can't be latest
        return_list.append(
            {
                name: merch.name,
                total_available: merch.quantity,
                total_sold: item['total_sold'],
                price: price.price
            }
        )
    return Response(return_list)


@api_view(['POST', 'GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UpdateVegetable(request):
    image = request.FILES["image"]
    body = json.loads(request.data['info'])
    if 'oldname' in body and isinstance(body["oldname"], str):
        vegToUpdate = Vegetable.objects.filter(name=body["oldname"]).first()
        vegToUpdate.name = body["newname"]
        vegToUpdate.photo = image
        vegToUpdate.unit = body["unit"].lower()
        unit_dict = {uname.lower(): unit for (unit, uname)
                     in VegetableType.choices}
        vegToUpdate.categories = unit_dict[body["categories"].lower()]
        vegToUpdate.save()
        return Response(vegToUpdate.id)
    else:
        return Response("Vegetable name not specified")


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


@api_view(['GET'])
def ListVegetables(request):
    items = Vegetable.objects.all()
    serializer = VegetableSerializer(items, many=True)
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
