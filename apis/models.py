from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class ProductType(models.IntegerChoices):
    VEGETABLE = 1, "Vegetable"
    MERCHANDISE = 2, "Merchandise"


class MerchandiseType(models.IntegerChoices):
    APPAREL = 1, "Apparel"
    STICKER = 2, "Sticker"
    OTHERS = 3, "Others"


class VegetableType(models.IntegerChoices):
    FRUIT = 1, "Fruit"
    VEGETABLE = 2, "Vegetable"
    HERB = 3, "Herb"
    OTHERS = 4, "Others"

def increment_receipt_number():
    last_transact = Transaction.objects.all().order_by('id').last()
    if not last_transact:
        return 'SG0001'
    receipt_num = last_transact.receipt_number
    receipt_int = int(receipt_num.split('SG')[-1])
    new_receipt_int = receipt_int + 1
    new_receipt = 'SG' + str(new_receipt_int)
    return new_receipt



class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    loggedInOnce = models.BooleanField(default=False)
    isGSAdmin = models.BooleanField(default=False)
    last_paid = models.DateTimeField(blank=True, null=True)
    def __str__(self):
        return self.user.username


class MerchandisePhotos(models.Model):
    image1 = models.ImageField(
        upload_to='images', default='images/default.jpg')
    image2 = models.ImageField(
        upload_to='images', default='images/default.jpg')
    image3 = models.ImageField(
        upload_to='images', default='images/default.jpg')


class Harvest(models.Model):
    date = models.DateTimeField(default=timezone.now)
    farm_name = models.CharField(max_length=20)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.farm_name + ' - ' + str(self.date)


class Merchandise(models.Model):
    name = models.CharField(max_length=100)
    photos = models.ForeignKey(to=MerchandisePhotos, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    categories = models.IntegerField(choices=MerchandiseType.choices)
    description = models.TextField()

    def __str__(self):
        return self.name


class MerchandisePrice(models.Model):
    merchandise = models.ForeignKey(to=Merchandise, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    updated_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.merchandise.name + '-' + str(self.price)


class Vegetable(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='images', default='images/default.jpg')
    unit = models.CharField(max_length=100)
    categories = models.IntegerField(choices=VegetableType.choices)

    def __str__(self):
        return self.name


class StockedVegetable(models.Model):
    vegetable = models.ForeignKey(
        to=Vegetable, on_delete=models.SET_NULL, null=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    harvested_on = models.DateTimeField(default=timezone.now)

    def remove_quantity(self, removal_amount):
        self.quantity -= removal_amount
        self.save()

    def get_quantity(self):
        return self.quantity


def __str__(self):
    return self.name


class VegetablePrice(models.Model):
    vegetable = models.ForeignKey(to=Vegetable, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    updated_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.vegetable.name + '-' + str(self.price)



class Transaction(models.Model):
    receipt_number = models.CharField(max_length=500, default=increment_receipt_number, unique=True)
    date = models.DateTimeField(default=timezone.now)
    user_id = models.ForeignKey(UserProfile, on_delete=models.PROTECT, null=True,  blank=True)
    is_picked = models.BooleanField(default=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_paid = models.BooleanField(default=False)
    method_of_payment = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)


class PurchasedItem(models.Model):
    transaction = models.ForeignKey(to=Transaction, on_delete=models.PROTECT, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    categories = models.IntegerField(choices=ProductType.choices)
    stocked_vegetable = models.ForeignKey(
        to=StockedVegetable, on_delete=models.PROTECT, null=True, blank=True)
    merchandise = models.ForeignKey(
        to=Merchandise, on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                name="Purchased item can only be either Vegetable or Merchandise",
                check=models.Q(categories=1, stocked_vegetable__isnull=False, merchandise__isnull=True) | models.Q(categories=2, merchandise__isnull=False, stocked_vegetable__isnull=True)
            )]

    def __str__(self):
        return str(self.id)
