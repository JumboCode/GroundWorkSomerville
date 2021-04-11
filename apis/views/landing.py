from apis.models import Vegetable, Harvest, Merchandise, MerchandisePrice
from apis.models import PurchasedItem, VegetablePrice, StockedVegetable
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, ParseError
from apis.views.utilities import decode_base64_image
import pandas as pandas
import json


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def MerchSummary(request):
    summary = []
    merchs = Merchandise.objects.all()
    for merch in merchs:
        price = MerchandisePrice.objects.filteer(merchandise=merch.id).latest('updated_on')
        summary.append([{
            'name': merch.name,
            'id': merch.id,
            'photo_url': merch.photo,
            'category': merch.categories,
            'price': price
        }])
    return Response(summary)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def MerchDetail(request, pk):
    merch = Merchandise.objects.get(id=pk)
    price = MerchandisePrice.objects.filter(merchandise=pk).latest('updated_on')
    return Response({
        'name': merch.name,
        'id': merch.id,
        'description': merch.description,
        'price': price,
        'photo_urls': [merch.photo]})

# {Categories: [
# { 	Name, 
# Produces:[{ID, Name, Photo_URL, Unit, Price, Available amount}] 
# } ]}

# class VegetableType(models.IntegerChoices):
#     FRUIT = 1, "Fruit"
#     VEGETABLE = 2, "Vegetable"
#     HERB = 3, "Herb"
#     OTHERS = 4, "Others"

# class Vegetable(models.Model):
#     name = models.CharField(max_length=100)
#     photo = models.ImageField(upload_to='images', default='images/default.jpg')
#     unit = models.CharField(max_length=100)
#     categories = models.IntegerField(choices=VegetableType.choices)

#     def __str__(self):
#         return self.name


# class StockedVegetable(models.Model):
#     vegetable = models.ForeignKey(
#         to=Vegetable, on_delete=models.SET_NULL, null=True)
#     weight = models.DecimalField(max_digits=10, decimal_places=2)
#     quantity = models.IntegerField()
#     harvested_on = models.ForeignKey(
#         to=Harvest, on_delete=models.SET_NULL, null=True)

#     def remove_quantity(self, removal_amount):
#         self.quantity -= removal_amount
#         self.save()

#     def get_quantity(self):
#         return self.quantity

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def AllProduce(request):
    produces = StockedVegetable.objects.all.
