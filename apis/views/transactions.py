from apis.models import StockedVegetable, Transaction, PurchasedItem, Merchandise
from apis.serializers import TransactionSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
import json


@api_view(['POST'])
def PurchaseMerchandise(request):
    return Merchandise


@api_view(['POST'])
def PurchaseProduce(request):
    body = json.loads(request.body)
    if request.user.is_authenticated():
        username = request.user.username
        user = User.objects.get(username=username)
        transaction = Transaction.objects.create(
            user_id=user, is_complete=body["is_complete"],
            is_paid=body["is_paid"], method_of_payment=body["method_payment"])

        for produce in body["produces"]:
            stocks = StockedVegetable.objects.filter(
                vegetable__name__contains=produce["name"]).order_by('-quantity')
            quantity = produce["amount"]

    return [transaction, stocks]


@api_view(['POST'])
def CreatePurchase(request):
    body = json.loads(request.body)
    user = User.objects.get(username='theohenry')  # reemove this
    transaction = Transaction.objects.create(
        user_id=user,
        is_complete=body["transaction"]["is_complete"],
        is_paid=body["transaction"]["is_paid"],
        method_of_payment=body["transaction"]["method_payment"])

    for veg in body["veggies"]:
        stocked = StockedVegetable.objects.filter(
            vegetable__name__contains=veg["name"]).order_by('-quantity')  # cheeck this
        quantity = veg["amount"]
        if stocked.exists():
            done = False
            for stock in stocked:
                if not done:
                    amount = quantity if stock.get_quantity() > quantity else stock.get_quantity()
                    stock.remove_quantity(amount)
                    quantity -= amount
                    if quantity <= 0:
                        done = True
            amount_purchased = veg["amount"] if done else veg["amount"]-quantity
            purchase = PurchasedItem.objects.create(
                transaction=transaction,
                total_quantity=amount_purchased,
                total_price=10,  # price is hardcoded
                stocked_vegetable=stock)

    return Response(transaction.id)  # return transaciton id in a json


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def UserTransactions(request, pk):
    transactions = Transaction.objects.get(user_id=pk)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)
