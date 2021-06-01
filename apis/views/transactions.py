from apis.models import StockedVegetable, Vegetable, Transaction, PurchasedItem, Merchandise, UserProfile, VegetablePrice, MerchandisePrice
from apis.serializers import TransactionSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
import json
from datetime import datetime
from django.db.models import Sum, F


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def PurchaseProduce(request):
    username = request.user.username
    body = json.loads(request.body)
    user = UserProfile.objects.get(user__username=username)
    transaction = Transaction.objects.create(
        user_id=user, method_of_payment="Picking up at the store")
    total_amount = Transaction.objects.filter(user_id=user).aggregate(Sum('total_amount'))
    if user.last_paid:
        total_amount = Transaction.objects.filter(user_id=user, date__gte=user.last_paid).aggregate(Sum('total_amount'))
    current_total = 0

    for item in body["items"]:
        vegetable = Vegetable.objects.get(pk=item["id"])
        if vegetable:
            stocked_veg = StockedVegetable.objects.filter(vegetable=vegetable).latest('harvested_on')
            stocked_veg.quantity = stocked_veg.quantity - item['quantity']
            stocked_veg.save()
            category = vegetable.categories
            price = VegetablePrice.objects.filter(vegetable=vegetable).latest('updated_on').price

            PurchasedItem.objects.create(
                transaction=transaction, categories=category,
                total_price=price, total_amount=item["quantity"],
                stocked_vegetable=stocked_veg, merchandise=None)
            current_total += (price * item["quantity"])
        else:
            return Response("Invalid Vegetable name")

    # transaction = Transaction.objects.get(pk=transaction)
    transaction.total_amount=current_total
    transaction.save()
    return Response({
        "transaction_id": transaction.id,
        "receipt_number": transaction.receipt_number,
        "total_owed": total_amount,
        "current_total": current_total
    })

@api_view(['POST'])
def PurchaseMerchandise(request):
    body = json.loads(request.body)
    transact = Transaction.objects.create(is_merch=True, method_of_payment="Picking up at the store")
    current_total = 0
    for item in body["items"]:
        merchandise = Merchandise.objects.filter(pk=item['id']).first()
        if merchandise:
            merchandise.quantity = merchandise.quantity - item["quantity"]
            merchandise.save()
            category = merchandise.categories
            price = MerchandisePrice.objects.filter(merchandise=merchandise).latest('updated_on').price
            PurchasedItem.objects.create(
                transaction=transact, categories=category,
                total_price=price, total_amount=item["quantity"],
                stocked_vegetable=None, merchandise=merchandise)
            current_total += (price * item["quantity"])
        else:
            return Response("Invalid Merchandise name")

    # transaction = Transaction.objects.get(pk=transact)
    transact.total_amount = current_total
    transact.save()
    return Response({
        "transaction_id": transact.id,
        "receipt_number": transact.receipt_number,
        "current_total": current_total})


@api_view(['GET'])
def ProducePurchases(request):
    return_list = []
    for user in UserProfile.objects.filter(isGSAdmin=False):
        transactions = Transaction.objects.filter(user_id=user).order_by('-date')
        if transactions.count() != 0:
            last_ordered = transactions.first().date
            if user.last_paid:
                transactions = Transaction.objects.filter(user_id=user, date__gte=user.last_paid)

            total_amount = 0
            if transactions:
                total_amount = transactions.aggregate(Sum('total_amount'))["total_amount__sum"]
            return_list.append({
                "user_name": user.user.username,
                "total_owed": total_amount,
                "last_paid": user.last_paid,
                "last_ordered": last_ordered
                })
    return Response(return_list)


@api_view(['POST'])
def ProducePurchasesEdit(request, username):
    profile = UserProfile.objects.get(user__username=username)
    profile.last_paid = datetime.now()
    profile.save()
    return Response("Successfully edited the items")


@api_view(['GET'])
def MerchPurchases(request):
    transactions = Transaction.objects.exclude(user_id__isnull=True).filter(is_merch=True)
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
def MerchPurchasesDetail(request, receiptnum):
    transact =  Transaction.objects.get(receipt_number=receiptnum).id
    all = PurchasedItem.objects.filter(transaction=transact).values('total_amount', 'merchandise__name', 'total_price')
    return Response(all)



@api_view(['POST'])
def MerchPurchasesEdit(request, receiptnum):
    body = json.loads(request.body)
    transaction = Transaction.objects.get(receipt_number=receiptnum)
    transaction.is_paid = body['is_paid']
    transaction.is_picked = body['is_picked']
    transaction.save()
    return Response("Successfully edited the items")
