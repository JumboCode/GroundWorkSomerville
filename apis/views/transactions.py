from apis.models import StockedVegetable, Vegetable, Transaction, PurchasedItem, Merchandise, UserProfile
from apis.serializers import TransactionSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
import json
from datetime import datetime
from django.db.models import Sum, F


@api_view(['POST'])
def PurchaseProduce(request):
    if request.user.is_authenticated():
        username = request.user.username
        body = json.loads(request.body)
        user = UserProfile.objects.get(user__username=username)
        transaction = Transaction.objects.create(
            user_id=user, is_picked=body["is_picked"],
            is_paid=body["is_paid"], method_of_payment=body["method_payment"])
        total_amount = Transaction.objects.filter(user_id=user).aggregate(Sum('total_amount'))
        if user.last_paid:
            total_amount = Transaction.objects.filter(user_id=user, date__gte=user.last_paid).aggregate(Sum('total_amount'))

        current_total = 0
        for item in body["items"]:
            vegetable = Vegetable.objects.filter(name=item["name"].capitalize()).first()
            if vegetable:
                stocked_veg = StockedVegetable.objects.filter(vegetable=vegetable).latest('harvested_on')
                stocked_veg.update(quantity=F('quantity') - item['quantity'])
                PurchasedItem.objects.create(
                    transaction=transaction, categories=item['category'],
                    total_price=item["price"], total_amount=item["quantity"],
                    stocked_vegetable=stocked_veg, merchandise=None)
                current_total += (item["price"]*item["quantity"])
            else:
                return Response("Invalid Vegetable name")

        Transaction.objects.get(id=transaction).update(total_amount=current_total)
        return Response({
            "transaction_id": transaction,
            "receipt_number": transaction.receipt_number,
            "total_owed": total_amount,
            "current_total": current_total
        })
    else:
        return Response("User not authenticated.")


@api_view(['POST'])
def PurchaseMerchandise(request):
    body = json.loads(request.body)
    transact = Transaction.objects.create(is_picked=body["is_picked"], is_paid=body["is_paid"], method_of_payment=body["method_payment"])
    current_total = 0
    for item in body["items"]:
        merchandise = Merchandise.objects.filter(name=item['name'].capitalize()).first()
        if merchandise:
            merchandise.update(quantity=F('quantity') - item["quantity"]) 
            PurchasedItem.objects.create(
                transaction=transact, categories=body["category"],
                total_price=item["price"], total_amount=item["quantity"],
                stocked_vegetable=None, merchandise=merchandise)
            current_total += (item["price"]*item["quantity"])
        else:
            return Response("Invalid Merchandise name")

    Transaction.objects.get(id=transact).update(total_amount=current_total)
    return Response({
        "transaction_id": transact.id,
        "receipt_number": transact.receipt_number,
        "current_total": current_total})


@api_view(['GET'])
def ProducePurchases(request):
    return_list = []
    for user in UserProfile.objects.filter(isGSAdmin=False):
        transactions = Transaction.objects.filter(user_id=user).order_by('-date')
        last_ordered = transactions.first().date
        if user.last_paid:
            transactions = Transaction.objects.filter(user_id=user, date__gte=user.last_paid)
        total_amount = transactions.aggregate(Sum('total_amount'))
        return_list.append({
            "user_name": user.user.username,
            "total_owed": total_amount,
            "last_paid": user.last_paid,
            "last_ordered": last_ordered
            })
    return Response(return_list)


@api_view(['POST'])
def ProducePurchasesEdit(request, username):
    UserProfile.objects.get(user__username=username).update(last_paid=datetime.now())
    return Response("Successfully edited the items")


@api_view(['GET'])
def MerchPurchases(request):
    transactions = Transaction.objects.filter(user_id__is_null=False)
    new_list = []
    for transact in transactions:
        new_list.append({
            "receipt_number": transact.receipt_number,
            "date_bought": transact.date,
            "total_owed": transact.total_amount,
            "paid": transact.is_paid,
            "picked_up": transact.is_picked
        })
    return Response(new_list)


@api_view(['GET'])
def MerchPurchasesDetail(request, receipt_number):
    transact =  Transaction.objects.get(receipt_number=receipt_number).id
    return PurchasedItem.objects.filter(transaction=transact).values('total_amount', 'merchandise__name', 'total_price')



@api_view(['POST'])
def MerchPurchasesEdit(request, receipt_number):
    body = json.loads(request.body)
    Transaction.objects.get(receipt_number=receipt_number).update(is_paid=body['is_paid'], is_picked=body['is_picked'])
    return Response("Successfully edited the items")
