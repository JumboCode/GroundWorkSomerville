from django.db import models
from django.utils import timezone
from django.conf import settings
from enum import Enum
from multiselectfield import MultiSelectField

# TODO: 1: figure out frontend authentication
# TODO: 2: add endpoints for User, Group, CATEGORIES CRUD operations
#           or figure out if Django supports them already

CATEGORIES = ((1, 'FRUIT'),
              (2, 'VEGETABLE'),
              (3, 'HERBS'),
              (4, 'SEASONAL'))
  
class Vegetable(models.Model):
  name = models.CharField(max_length=100)
  photo = models.ImageField(upload_to='images', default='default.jpg')
  availability = models.BooleanField(default=False)
  categories = MultiSelectField(choices=CATEGORIES)

  def __str__(self):
    return self.name


class Harvest(models.Model):
  date = models.DateTimeField(default=timezone.now)
  farm_name = models.CharField(max_length=20)
  created_on = models.DateTimeField(default=timezone.now)
  updated_on = models.DateTimeField(default=timezone.now)
  active = models.BooleanField(default=True)

  def __str__(self):
    return self.farm_name + ' - ' + str(self.date)

class StockedVegetable(models.Model):
  name = models.CharField(max_length=100)
  weight = models.DecimalField(max_digits=10, decimal_places=2)
  quantity = models.IntegerField()
  # on_delete might need to be changed to models.SET_NULL
  harvested_on = models.ForeignKey(to=Harvest, on_delete=models.PROTECT)

  def __str__(self):
    return self.name

class Price(models.Model):
  veg = models.ForeignKey(to=Vegetable, on_delete=models.PROTECT)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  updated_on = models.DateTimeField(default=timezone.now)

  def __str__(self):
    return self.veg.name + '-' + str(price)
