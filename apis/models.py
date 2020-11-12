from django.db import models
from django.utils import timezone
from django.conf import settings
from enum import Enum

class Category(Enum):
  FRUIT = "FRUIT"
  VEGETABLE = "VEGETABLE"
  HERBS = "HERBS"
  SEASONAL = "SEASONAL"

  @classmethod
  def choices(cls):
    return tuple((i.name, i.value) for i in cls)
  
class Vegetable(models.Model):
  name = models.CharField(max_length=100)
  # server default pic in static folder
  # TODO: this is not working
  photo = models.ImageField(upload_to='images', default='/static/media/default.jpg')
  availability = models.BooleanField(default=False)
  categories = models.CharField(max_length=180, choices=Category.choices(), default='VEGETABLE')

  def __str__(self):
    return self.name


class Harvest(models.Model):
  date = models.DateTimeField(default=timezone.now)
  farm_name = models.CharField(max_length=20)
  created_by = models.ForeignKey
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
