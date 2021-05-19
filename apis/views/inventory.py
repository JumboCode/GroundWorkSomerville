from apis.models import Vegetable, Harvest, Merchandise, MerchandisePrice, StockedVegetable
from apis.models import PurchasedItem, VegetablePrice, StockedVegetable, MerchandisePhotos
from apis.models import VegetableType, MerchandiseType
from apis.serializers import HarvestSerializer, VegetableSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, ParseError
from apis.views.utilities import decode_base64_image
import json
from django.db.models import Sum


@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
def AddHarvest(request):
    item = json.loads(request.data["info"])
    name = item["name"]
    quantity = item["quantity"]
    weight = item["weight"]
    veg = Vegetable.objects.filter(name=name).first()
    new_harvest = StockedVegetable(vegetable=veg, quantity=quantity,
                                    weight=weight)
    new_harvest.save()
    return Response("Added to the table.")


@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
def AddMerchandise(request):
    photo1 = request.FILES["photo1"]
    photo2 = request.FILES["photo2"]
    photo3 = request.FILES["photo3"]
    item = json.loads(request.data['info'])
    name = item["name"]
    quantity = item["quantity"]
    category = item["category"]
    description = item["description"]
    price = item["price"]
    all_photo = MerchandisePhotos(image1=photo1, image2=photo2, image3=photo3)
    all_photo.save()
    new_merch = Merchandise(name=name, quantity=quantity,
                            categories=category,
                            description=description,
                            photos=all_photo)
    new_merch.save()
    new_price = MerchandisePrice(merchandise=new_merch, price=price)
    new_price.save()
    return Response("Added to the table.")


@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
def AddProduce(request):
    photo = request.FILES["photo"]
    item = json.loads(request.data['info'])
    name = item["name"]
    unit = item["unit"]
    category = item["category"]
    price = item["price"]
    new_veg = Vegetable(name=name, photo=photo, unit=unit, categories=category)
    new_veg.save()
    new_price = VegetablePrice(vegetable=new_veg, price=price)
    new_price.save()
    return Response("Added to the table.")


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def HarvestDetail(request, pk):
    item = StockedVegetable.objects.get(id=pk)
    vegetable = Vegetable.objects.get(id=item.vegetable.id)
    price = VegetablePrice.objects.get(
        id=item.vegetable.id).latest("updated_on")
    # should be the latest or according to the date?
    return Response(
        {
            "name":  vegetable.name,
            "unit": vegetable.unit,
            "price": price.price,
            "photo_URL-list": [vegetable.photo.url]
        })


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def ProduceDetail(request, pk):
    item = StockedVegetable.objects.get(id=pk)
    vegetable = Vegetable.objects.get(id=item.vegetable.id)
    price = VegetablePrice.objects.get(
        id=item.vegetable.id).latest("updated_on")
    # should be the latest or according to the date?
    return Response(
        {
            "name":  vegetable.name,
            "unit": vegetable.unit,
            "price": price.price,
            "photo_URL-list": [vegetable.photo.url]
        })


@api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
def HarvestInventory(request):
    if not request.data:
        return Response("The endpoint requires start date and end date.")
    else:
        startdate = request.data['start_date']
        enddate = request.data['end_date']
        stockedvegetables = StockedVegetable.objects.filter(
            harvested_on__range=[startdate, enddate]).first()
        return_list = []
        for stocked in stockedvegetables:
            item = PurchasedItem.objects.filter(
                stockedvegetables=stocked).first()
            vegetable = stocked.vegetable
            price = VegetablePrice.objects.filter(
                vegetable=vegetable,
                updated_on__gte=startdate,
                updated_on__lte=enddate).order_by('-updated_on')
            return_list.append(
                {
                    "name": vegetable.name,
                    "total_available": stocked.quantity,
                    "unit": vegetable.unit,
                    "total_sold": item.total_amount,
                    "price": price.price
                })

        return Response(return_list)


@api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
def MerchandiseInventory(request):
    return_list = []
    for merch in Merchandise.objects.all():
        item = PurchasedItem.objects.filter(
            merchandise=merch).aggregate(total_sold=Sum('total_amount'))
        price = MerchandisePrice.objects.filter(
            merchandise=merch).latest('updated_on')
        return_list.append(
            {
                "name": merch.name,
                "total_available": merch.quantity,
                "total_sold": item['total_sold'],
                "price": price.price
            }
        )
    return Response(return_list)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def ProduceInventory(request):
    produce_list = []

    for produce in Vegetable.objects.all():
        price = VegetablePrice.objects.filter(
            vegetable=produce).latest('updated_on')
        produce_list.append({
            "name": produce.name,
            "unit": produce.unit,
            "category": produce.categories,
            "photo": produce.photo.url,
            "price": price.price
        })
    return Response(produce_list)

# update price left


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UpdateVegetable(request):
    image = request.FILES["image"]
    body = json.loads(request.data['info'])
    if 'oldname' in body and isinstance(body["oldname"], str):
        vegToUpdate = Vegetable.objects.filter(name=body["oldname"]).first()
        vegToUpdate.name = body["name"]
        vegToUpdate.photo = image
        vegToUpdate.unit = body["unit"].lower()
        # unit_dict = {uname.lower(): unit for (unit, uname)
        #              in VegetableType.choices}
        vegToUpdate.categories = body["categories"]
        vegToUpdate.save()
        return Response(vegToUpdate.id)
    else:
        return Response("Vegetable name not specified")

# update price and photos left


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UpdateMerchandise(request):
    image1 = request.FILES["photo1"]
    image2 = request.FILES["photo2"]
    image3 = request.FILES["photo3"]
    body = json.loads(request.data['info'])
    if 'oldname' in body and isinstance(body["oldname"], str):
        merchToUpdate = Merchandise.objects.filter(
            name=body["oldname"]).first()
        merchToUpdate.name = body["name"]
        merchToUpdate.description = body["description"]
        merchToUpdate.quantity = body["quantity"]
        # unit_dict = {uname.lower(): unit for (unit, uname)
        #              in MerchandiseType.choices}
        merchToUpdate.categories = body["categories"]
        merchToUpdate.save()
        return Response(merchToUpdate.id)
    else:
        return Response("Vegetable name not specified")


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UpdateHarvest(request):
    return Response("Harvest Not Specified")


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
