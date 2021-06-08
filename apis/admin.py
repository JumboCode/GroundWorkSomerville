from django.contrib import admin
from django.contrib.auth.models import User
from .models import Vegetable, Harvest, Transaction, Merchandise, MerchandisePrice
from .models import PurchasedItem, UserProfile, VegetablePrice, StockedVegetable
from .models import MerchandisePhotos

admin.site.register(User)
admin.site.register(Vegetable)
admin.site.register(StockedVegetable)
admin.site.register(Harvest)
admin.site.register(VegetablePrice)
admin.site.register(PurchasedItem)
admin.site.register(Transaction)
admin.site.register(UserProfile)
admin.site.register(Merchandise)
admin.site.register(MerchandisePrice)
admin.site.register(MerchandisePhotos)
