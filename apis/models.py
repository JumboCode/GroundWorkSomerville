from django.db import models
from django.utils import timezone

class Vegetable(models.Model):
  name = models.CharField(max_length=100)
  # price = models.DecimalField(max_digits=5, decimal_places=2)
  photo = models.ImageField(upload_to='images', default='/static/media/default.jpg') # server default pic in static folder
  availability = models.BooleanField(default=False)

class Harvest(models.Model):
  date = models.DateField(default=timezone.now)
  farm_name = models.CharField(max_length=20)
  created_on = models.DateField(default=timezone.now)
  updated_on = models.DateField(default=timezone.now)
  active = models.BooleanField(default=True)

class StockedVegetable(models.Model):
  name = models.CharField(max_length=100)
  weight = models.DecimalField(max_digits=10, decimal_places=2)
  quantity = models.IntegerField()
  harvested_on = models.ForeignKey(to=Harvest, on_delete=models.PROTECT)

class Prices(models.Model):
  veg = models.ForeignKey(to=Vegetable, on_delete=models.PROTECT)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  updated_on = models.DateField(default=timezone.now)