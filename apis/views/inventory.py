from apis.models import Vegetable, Harvest, Merchandise, MerchandisePrice, StockedVegetable
from apis.models import PurchasedItem, VegetablePrice, StockedVegetable, MerchandisePhotos
from apis.models import VegetableType, MerchandiseType
from apis.serializers import HarvestSerializer, VegetableSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, ParseError
from apis.views.utilities import decode_base64_image
import json
from django.db.models import Sum
from apis.decorators import mobile_market, groundwork_admin


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AddHarvest(request):
    item = json.loads(request.data["info"])
    name = item["name"].capitalize()
    quantity = item["quantity"]
    weight = item["weight"]
    veg = Vegetable.objects.filter(name=name).first()
    StockedVegetable.objects.create(
        vegetable=veg, quantity=quantity, weight=weight)
    return Response("Added to the table.")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AddMerchandise(request):
    photo1 = request.FILES["photo1"]
    photo2 = request.FILES["photo2"]
    photo3 = request.FILES["photo3"]
    item = json.loads(request.data['info'])
    name = item["name"].capitalize()
    quantity = item["quantity"]
    category = item["category"]
    description = item["description"]
    price = item["price"]
    all_photo = MerchandisePhotos(image1=photo1, image2=photo2, image3=photo3)
    all_photo.save()
    new_merch = Merchandise.objects.create(
        name=name, quantity=quantity,
        categories=category,
        description=description,
        photos=all_photo)
    new_price = MerchandisePrice(merchandise=new_merch, price=price)
    new_price.save()
    return Response("Added to the table.")


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def MerchDetailInventory(request, pk):
    merch = Merchandise.objects.get(pk=pk)
    price = MerchandisePrice.objects.filter(
        merchandise=pk).latest('updated_on')
    photos = MerchandisePhotos.objects.get(pk=merch.photos.id)
    return Response({
        'name': merch.name,
        'id': merch.id,
        'description': merch.description,
        'category': merch.categories,
        'quantity': merch.quantity,
        'price': price.price,
        'photo_urls': [photos.image1.url, photos.image2.url, photos.image3.url]})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AddProduce(request):
    photo = request.FILES["photo"]
    item = json.loads(request.data['info'])
    name = item["name"].capitalize()
    unit = item["unit"].lower()
    category = item["category"]
    price = item["price"]
    new_veg = Vegetable(name=name, photo=photo, unit=unit, categories=category)
    new_veg.save()
    new_price = VegetablePrice(vegetable=new_veg, price=price)
    new_price.save()
    return Response("Added to the table.")


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def HarvestDetail(request, pk):
    item = StockedVegetable.objects.get(id=pk)
    return Response(
        {
            "name": item.vegetable.name,
            "quantity": item.quantity,
            "weight": item.weight,
        })


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ProduceDetail(request, pk):
    vegetable = Vegetable.objects.get(pk=pk)
    price = VegetablePrice.objects.filter(
        vegetable=vegetable).latest("updated_on")
    return Response(
        {
            "id": vegetable.id,
            "name":  vegetable.name,
            "unit": vegetable.unit,
            "price": price.price,
            "category": vegetable.categories,
            "photo_url": vegetable.photo.url
        })


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def HarvestInventory(request):
    startdate = request.GET.get('start_date')
    enddate = request.GET.get('end_date')
    if (not startdate) or (not enddate):
        return Response("The endpoint requires start date and end date.")
    else:
        stockedvegetables = StockedVegetable.objects.filter(
            harvested_on__range=[startdate, enddate])
        return_list = []
        if stockedvegetables:
            for stocked in stockedvegetables:
                item = PurchasedItem.objects.filter(
                    stocked_vegetable=stocked).first()
                total_sold = 0 if not item else item.total_amount
                vegetable = stocked.vegetable
                price = VegetablePrice.objects.filter(
                    vegetable=vegetable,
                    updated_on__range = [startdate, enddate]).latest('-updated_on')
                return_list.append(
                    {
                        "id": stocked.id,
                        "name": vegetable.name,
                        "total_available": stocked.quantity,
                        "unit": vegetable.unit,
                        "total_sold": total_sold,
                        "price": price.price
                    })
        return Response(return_list)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def MerchandiseInventory(request):
    return_list = []
    for merch in Merchandise.objects.all():
        item = PurchasedItem.objects.filter(
            merchandise=merch).aggregate(total_sold=Sum('total_amount'))
        total_sold = 0 if not item else item['total_sold']
        price = MerchandisePrice.objects.filter(
            merchandise=merch).latest('updated_on')
        return_list.append(
            {
                "id": merch.id,
                "name": merch.name,
                "total_available": merch.quantity,
                "total_sold": total_sold,
                "price": price.price
            }
        )
    return Response(return_list)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ProduceInventory(request):
    produce_list = []

    for produce in Vegetable.objects.all():
        price = VegetablePrice.objects.filter(
            vegetable=produce).latest('updated_on')
        produce_list.append({
            "id": produce.id,
            "name": produce.name,
            "unit": produce.unit,
            "category": produce.categories,
            "photo": produce.photo.url,
            "price": price.price
        })
    return Response(produce_list)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateVegetable(request):
    body = json.loads(request.data['newData'])
    vegToUpdate = Vegetable.objects.get(pk=body["id"])

    if request.FILES.get("photo", None):
        vegToUpdate.photo = request.FILES["photo"]

    price = float(VegetablePrice.objects.filter(vegetable=vegToUpdate).latest('updated_on').price)

    if price != float(body['price']):
        VegetablePrice.objects.create(vegetable=vegToUpdate, price=body["price"])

    vegToUpdate.name = body["name"]
    vegToUpdate.unit = body["unit"].lower()
    vegToUpdate.categories = body["category"]
    vegToUpdate.save()

    return Response(vegToUpdate.photo.url)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateMerchandise(request):
    body = json.loads(request.data['newData'])
    merchToUpdate = Merchandise.objects.get(pk=body['id'])
    photos = merchToUpdate.photos
    if request.FILES.get("photo1", None):
        photos.image1 = request.FILES["photo1"]
    if request.FILES.get("photo2", None):
        photos.image2 = request.FILES["photo2"]
    if request.FILES.get("photo3", None):
        photos.image3 = request.FILES["photo3"]

    photos.save()

    price = float(MerchandisePrice.objects.filter(merchandise=merchToUpdate).latest('updated_on').price)

    if price != body['price']:
        MerchandisePrice.objects.create(merchandise=merchToUpdate, price=body["price"])

    merchToUpdate.name = body["name"]
    merchToUpdate.description = body["description"]
    merchToUpdate.quantity = body["quantity"]
    merchToUpdate.categories = body["category"]
    merchToUpdate.save()
    return Response([photos.image1.url, photos.image2.url, photos.image3.url])


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateHarvest(request):
    body = json.loads(request.data['newData'])
    harvestToUpdate = StockedVegetable.objects.get(pk=body['id'])
    harvestToUpdate.quantity = body['quantity']
    harvestToUpdate.weight = body['weight']
    harvestToUpdate.save()
    return Response("Successful")



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateVegetable(request):
    serializer = VegetableSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print("invalid data")
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ListVegetables(request):
    items = Vegetable.objects.all()
    serializer = VegetableSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeleteVegetable(request, pk):
    itemToDelete = Vegetable.objects.get(id=pk)
    itemToDelete.delete()
    return Response("Item deleted")


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def SearchVegetables(request, pk):
    items = Vegetable.objects.all().filter(name__icontains=pk)
    serializer = VegetableSerializer(items, many=True)
    return Response(serializer.data)
