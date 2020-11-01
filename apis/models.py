from django.db import models

import datetime

class Vegetable(models.Model):
  name = models.CharField(max_length=100)
  price = models.DecimalField(max_digits=5, decimal_places=2)
  #'images' is where the photos will be stored (MEDIA_ROOT/images/)
  photo = models.ImageField(upload_to='images', default="{%static 'vegetables/default.jpg%}")
  # image = models.ImageField(upload_to='users/%Y/%m/%d/')
  availability = models.BooleanField(default=False)



class Harvest(models.Model):
  date = models.DateField(default=datetime.date.today())
  farm_name = models.CharField(max_length=100)
  active = models.BooleanField(default=True)

class StockedVegetable(models.Model):
  name = models.CharField(max_length=100)
  weight = models.DecimalField(max_digits=10, decimal_places=2)
  quantity = models.IntegerField()
  harvested_on = models.ForeignKey(to=Harvest, on_delete=models.CASCADE)
