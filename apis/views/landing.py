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



#class Merchandise(models.Model):
#     name = models.CharField(max_length=100)
#     photo = models.ImageField(upload_to='images', default='images/default.jpg')
#     quantity = models.DecimalField(max_digits=10, decimal_places=2)
#     categories = models.IntegerField(choices=MerchandiseType.choices)
#     deescription = moels.TextField()

#     def __str__(self):
#         return self.name

# def DeleteVegetable(request, pk):
#     itemToDelete = Vegetable.objects.get(id=pk)
#     itemToDelete.delete()

# class MerchandisePrice(models.Model):
#     merchandise = models.ForeignKey(to=Merchandise, on_delete=models.PROTECT)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     updated_on = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return self.vegetable.name + '-' + str(self.price)
#
#
#

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def MerchSummary(request):
    all_merchandise = merch.objects.all()
    return Response([ ])


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def MerchDetail(request, pk):
    merch = Merchandise.objects.get(id=pk)
    price = MerchandisePrice.objects.filter(merchandise=pk).latest('updated_on')
    return Response({
        'name': merch.name,
        'id': pk,
        'description': merch.description,
        'price': price,
        'photo_urls': [merch.photo]})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def AllProduce(request):
    return request

