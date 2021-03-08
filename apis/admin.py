from django.contrib import admin

from .models import *

admin.site.register(Vegetable)
admin.site.register(StockedVegetable)
admin.site.register(Harvest)
admin.site.register(VegetablePrice)
admin.site.register(PurchasedItem)
admin.site.register(Transaction)
admin.site.register(UserProfile)
admin.site.register(Merchandise)
admin.site.register(MerchandisePrice)