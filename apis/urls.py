from django.urls import path
from apis.views import transactions, inventory, landing, authentication
from backend.views import index
from django.conf.urls import url
from django.conf import settings
from django.views.static import serve


urlpatterns = [
    path('list-vegetables', inventory.ListVegetables, name="list-vegetables"),
    path('create-vegetable', inventory.CreateVegetable, name="create-vegetable"),
    path('delete-vegetable/<str:pk>',
         inventory.DeleteVegetable, name="delete-vegetable"),
    path('search-vegetables/<str:pk>',
         inventory.SearchVegetables, name="search-vegetables"),

    path('search-merchandise/<str:pk>',
         landing.SearchMerchandise, name="search-merchandise"),

    path('harvest-inventory', inventory.HarvestInventory, name='harvest-inventory'),
    path('merchandise-inventory', inventory.MerchandiseInventory,
         name='merchandise-inventory'),
    path('produce-inventory', inventory.ProduceInventory, name='produce-inventory'),
    path('harvest-detail/<str:pk>', inventory.HarvestDetail, name='harvest-detail'),
    path('produce-detail/<str:pk>', inventory.ProduceDetail, name='produce-detail'),

    path('add-merchandise', inventory.AddMerchandise, name='add-merchandise'),
    path('add-produce', inventory.AddProduce, name='add-produce'),
    path('add-harvest', inventory.AddHarvest, name='add-harvest'),

    path('update-produce', inventory.UpdateVegetable, name="update-vegetable"),
    path('update-merchandise', inventory.UpdateMerchandise, name='update-merchandise'),
    path('update-harvest', inventory.UpdateHarvest, name='update=harvest'),

    path('user', authentication.GetUser, name="user-info"),
    path('add-user', authentication.AddUser, name="add-user"),
    path('changepass', authentication.ChangePassword, name="change-pass"),
    path('login', authentication.login, name="login"),
    path('logout', authentication.logout, name="logout"),

    path('merch-summary', landing.MerchSummary, name="merch-summary"),
    path('merch-detail/<str:pk>', landing.MerchDetail, name="merch-detail"),
    path('public-checkout', transactions.PurchaseMerchandise, name="merch-purchase"),

    path('all-produce', landing.AllProduce, name="all-produce"),
    path('mm-checkout', transactions.PurchaseProduce, name="mm-checkout"),
    path('', index, name="index")
]

if not settings.IS_HEROKU:
    urlpatterns.append(url(r'^media/(?P<path>.*)$', serve,
                           {'document_root': settings.MEDIA_ROOT, }))
