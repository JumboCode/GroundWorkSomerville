from apis.models import Vegetable, Merchandise, MerchandisePrice, MerchandisePhotos
from apis.models import VegetablePrice, StockedVegetable
from apis.models import VegetableType
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(['GET'])
def MerchSummary(request):
    summary = []
    merchs = Merchandise.objects.all()
    for merch in merchs:
        price = MerchandisePrice.objects.filter(
            merchandise=merch.id).latest('updated_on')
        summary.append({
            'name': merch.name,
            'id': merch.id,
            'photo_url': merch.photo.url,
            'category': [merch.categories],
            'price': price.price
        })
    return Response(summary)


@api_view(['GET'])
def MerchDetail(request, pk):
    merch = Merchandise.objects.get(id=pk)
    price = MerchandisePrice.objects.filter(
        merchandise=pk).latest('updated_on')
    photos = MerchandisePhotos.objects.filter(merchandise=pk)[0]
    print(photos)
    return Response({
        'name': merch.name,
        'id': merch.id,
        'description': merch.description,
        'price': price.price,
        'photo_urls': [photos.image2.url, photos.image3.url, photos.image4.url]})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def AllProduce(request):
    categories = []
    for choices in VegetableType.choices:
        vegetables = Vegetable.objects.filter(categories=choices[0])
        produces = []
        for vegetable in vegetables.iterator():
            stocked = StockedVegetable.objects.filter(vegetable=vegetable)
            price = VegetablePrice.objects.filter(
                vegetable=vegetable).latest('updated_on')
            produces.append(
                {"name": vegetable.name,
                 "photo_url": vegetable.photo,
                 "unit": vegetable.unit,
                 "price": price.price,
                 "available_amount": stocked.quantity})
        categories.append({"name": choices[1], "produces": produces})
    return Response({"categories": categories})
