from apis.models import StockedVegetable, Vegetable, Transaction, PurchasedItem, Merchandise
from apis.serializers import TransactionSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
import json


# class Transaction(models.Model):
#     date = models.DateTimeField(default=timezone.now)
#     user_id = models.ForeignKey(User, on_delete=models.PROTECT)
#     is_complete = models.BooleanField(default=False)
#     is_paid = models.BooleanField(default=False)
#     method_of_payment = models.CharField(max_length=100)

#     def __str__(self):
#         return str(self.id)

# class PurchasedItem(models.Model):
#     transaction = models.ForeignKey(to=Transaction, on_delete=models.PROTECT)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2)
#     total_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     categories = models.IntegerField(choices=ProductType.choices)
#     stocked_vegetable = models.ForeignKey(
#         to=StockedVegetable, on_delete=models.PROTECT, null=True)
#     merchandise = models.ForeignKey(
#         to=Merchandise, on_delete=models.PROTECT, null=True)

#     class Meta:
#         constraints = [
#             models.CheckConstraint(
#                 name="purchased item can be either vegetable or merchandise",
#                 check = models.Q(categories=1 
#                 stocked_vegetable__isnull=False, 
#                 merchandise__isnull=True) and models.Q(categories=2, 
#                 merchandise__isnull=False, stocked_vegetable__isnull=True)
#             )]

#     def __str__(self):
#         return str(self.id)
'''
items: [{
    name:
    quantity:
    price:
}]
set category as vegetable (1) or merchandise (2)
'''

@api_view(['POST'])
def PurchaseProduce(request):
    body = json.loads(request.body)
    username = None
    if request.user.is_authenticated():
        username = request.user.username
    else:
        return Response("User not authenticated.")
    user = User.objects.get(username=username)
    transaction = Transaction.objects.create(
        user_id=user, is_complete=body["is_complete"],
        is_paid=body["is_paid"], method_of_payment=body["method_payment"])
    transaction.save()
    for item in body["items"]:
        vegetable = Vegetable.objects.filter(name=item["name"]).first()
        stocked_veg = StockedVegetable.objects.filter(vegetable=vegetable).latest('harvested_on')
        stocked_veg['quantity'] -= item["quantity"]
        stocked_veg.save()
        purchased_item = PurchasedItem.objects.create(
            transaction = transaction, categories = 1,
            total_price = item["price"], total_amount = item["quantity"],
            stocked_vegetable = stocked_veg, merchandise=None)
        purchased_item.save()
    return Response(transaction)


@api_view(['POST'])
def PurchaseMerchandise(request):
    body = json.loads(request.body)
    username = None
    if request.user.is_authenticated():
        username = request.user.username
    else:
        return Response("User not authenticated.")
    user = User.objects.get(username=username)
    transaction = Transaction.objects.create(
        user_id=user, is_complete=body["is_complete"],
        is_paid=body["is_paid"], method_of_payment=body["method_payment"])
    transaction.save()
    for item in body["items"]:
        merchandise = Merchandise.objects.filter(name=item['name']).first()
        merchandise["quantity"] -= item["quantity"]
        merchandise.save()
        purchased_item = PurchasedItem.objects.create(
            transaction = transaction, categories = 1,
            total_price = item["price"], total_amount = item["quantity"],
            stocked_vegetable = None, merchandise= merchandise)
        purchased_item.save()
    return Response(transaction)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UserTransactions(request, pk):
    transactions = Transaction.objects.get(user_id=pk)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)
