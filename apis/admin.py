from django.contrib import admin

from .models import *

admin.site.register(Vegetable)
admin.site.register(StockedVegetable)
admin.site.register(Harvest)
admin.site.register(Price)