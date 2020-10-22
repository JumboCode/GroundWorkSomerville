from django.db import models

class Vegetable(models.Model):
  name = models.CharField(max_length=100)
  price = models.DecimalField(max_digits=5, decimal_places=2)
  photo = models.ImageField(upload_to='images', default="{%static 'vegetables/default.jpg%}") #'images' is where the photos will be stored (MEDIA_ROOT/images/)
  # image = models.ImageField(upload_to='users/%Y/%m/%d/', blank=True)
  availability = models.BooleanField(default=False)
