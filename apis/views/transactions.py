from apis.models import StockedVegetable, Vegetable, Transaction, PurchasedItem, Merchandise
from apis.serializers import TransactionSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
import json

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
        if vegetable:
            stocked_veg = StockedVegetable.objects.filter(vegetable=vegetable).latest('harvested_on')
            stocked_veg['quantity'] -= item["quantity"]
            stocked_veg.save()
            purchased_item = PurchasedItem.objects.create(
                transaction = transaction, categories = 1,
                total_price = item["price"], total_amount = item["quantity"],
                stocked_vegetable = stocked_veg, merchandise=None)
            purchased_item.save()
    return Response({
        "transaction_id": transaction,
        "total_owed": item['quantity'],
        "current_total": item['quantity']
    })


@api_view(['POST'])
def PurchaseMerchandise(request):
    body = json.loads(request.body)
    user = None
    transaction = Transaction.objects.create(is_complete=body["is_complete"],
        is_paid=body["is_paid"], method_of_payment=body["method_payment"])
    transaction.save()
    for item in body["items"]:
        merchandise = Merchandise.objects.filter(name=item['name']).first()
        if merchandise:
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
