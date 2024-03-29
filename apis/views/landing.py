from apis.models import Vegetable, Merchandise, MerchandisePrice, MerchandisePhotos, MerchandiseType
from apis.models import VegetablePrice, StockedVegetable
from apis.models import VegetableType
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apis.decorators import mobile_market


@api_view(['GET'])
def MerchSummary(request):
    summary = []
    merchs = Merchandise.objects.all()
    for merch in merchs:
        photos = MerchandisePhotos.objects.get(pk=merch.photos.id)
        price = MerchandisePrice.objects.filter(
            merchandise=merch).latest('updated_on')
        cat = list(filter(lambda x: x[0] == merch.categories, MerchandiseType.choices))[0][1]
        summary.append({
            'name': merch.name,
            'id': merch.id,
            'photo_url': photos.image1.url,
            'category': cat,
            'price': price.price
        })
    return Response(summary)


@api_view(['GET'])
def MerchDetail(request, pk):
    merch = Merchandise.objects.get(pk=pk)
    price = MerchandisePrice.objects.filter(
        merchandise=pk).latest('updated_on')
    photos = MerchandisePhotos.objects.get(pk=merch.photos.id)
    return Response({
        'name': merch.name,
        'id': merch.id,
        'available': merch.quantity,
        'description': merch.description,
        'price': price.price,
        'photo_urls': [photos.image1.url, photos.image2.url, photos.image3.url]})


@api_view(['GET'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def AllProduce(request):
    categories = []
    for choices in VegetableType.choices:
        vegetables = Vegetable.objects.filter(categories=choices[0])
        produces = []
        for vegetable in vegetables.iterator():
            stocked = StockedVegetable.objects.filter(vegetable=vegetable).first()
            price = VegetablePrice.objects.filter(
                vegetable=vegetable).latest('updated_on')
            quantity = 0 if not stocked else stocked.quantity
            produces.append(
                {"id": vegetable.id,
                 "name": vegetable.name,
                 "photo_url": vegetable.photo.url,
                 "unit": vegetable.unit,
                 "price": price.price,
                 "available_amount": quantity})
        categories.append({"name": choices[1], "produces": produces})
    return Response(categories)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ProduceNames(request):
    return_list = Vegetable.objects.values_list('name', flat=True).distinct()
    return Response(return_list)


@api_view(['GET'])
def MerchandiseNames(request):
    return_list = Merchandise.objects.values_list('name', flat=True).distinct()
    return Response(return_list)


@api_view(['GET'])
def SearchMerchandise(request, pk):
    summary = []
    items = Merchandise.objects.all().filter(name__icontains=pk)
    for merch in items:
        photos = MerchandisePhotos.objects.get(pk=merch.photos.id)
        price = MerchandisePrice.objects.filter(
            merchandise=merch.id).latest('updated_on')
        summary.append({
            'name': merch.name,
            'id': merch.id,
            'photo_url': photos.image1.url,
            'category': merch.categories,
            'price': price.price
        })
    return Response(summary)
