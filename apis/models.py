from django.db import models
from django.utils import timezone
from django.conf import settings
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

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  loggedInOnce = models.BooleanField(default=False)
  isGSAdmin = models.BooleanField(default=False)
  def __str__(self):
    return self.user.username

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
  photo = models.ImageField(upload_to='images', default='images/default.jpg')
  quantity = models.DecimalField(max_digits=10, decimal_places=2)
  categories = models.IntegerField(choices=MerchandiseType.choices)

  def __str__(self):
    return self.name

class MerchandisePrice(models.Model):
  merchandise = models.ForeignKey(to=Merchandise, on_delete=models.PROTECT)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  updated_on = models.DateTimeField(default=timezone.now)

  def __str__(self):
    return self.veg.name + '-' + str(price) 


class Vegetable(models.Model):
  name = models.CharField(max_length=100)
  photo = models.ImageField(upload_to='images', default='images/default.jpg')
  unit = models.CharField(max_length=100)
  categories = models.IntegerField(choices=VegetableType.choices)
  def __str__(self):
    return self.name

class StockedVegetable(models.Model):
  vegetable = models.ForeignKey(to=Vegetable, on_delete=models.SET_NULL, null=True)
  weight = models.DecimalField(max_digits=10, decimal_places=2)
  quantity = models.IntegerField()
  harvested_on = models.ForeignKey(to=Harvest, on_delete=models.SET_NULL, null=True) 
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
    return self.veg.name + '-' + str(price)

class Transaction(models.Model):
  date = models.DateTimeField(default=timezone.now)
  user_id = models.ForeignKey(User, on_delete=models.PROTECT)
  is_complete = models.BooleanField(default=False)
  is_paid = models.BooleanField(default=False)
  method_of_payment = models.CharField(max_length=100)

  def __str__(self):
    return str(self.id)

class PurchasedItem(models.Model):
  transaction = models.ForeignKey(to=Transaction, on_delete=models.PROTECT)
  total_price = models.DecimalField(max_digits=10, decimal_places=2)
  total_amount = models.DecimalField(max_digits=10, decimal_places=2)
  categories = models.IntegerField(choices=ProductType.choices)
  stocked_vegetable = models.ForeignKey(to=StockedVegetable, on_delete=models.PROTECT, null=True)
  merchandise = models.ForeignKey(to=Merchandise, on_delete=models.PROTECT, null=True)
  
  class Meta:
    constraints = [
      models.CheckConstraint(
        name  = "purchased item can be either vegetable or merchandise",
        check =  
        models.Q(categories = 1, stocked_vegetable__isnull = False, merchandise__isnull = True ) | 
        models.Q(categories = 2, merchandise__isnull = False, stocked_vegetable__isnull=True)
      )]

  def __str__(self):
    return str(self.id)
