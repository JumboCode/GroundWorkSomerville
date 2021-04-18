from django.urls import path
from apis.views import transactions, inventory, landing, authentication
from django.conf.urls import url
from django.conf import settings
from django.views.static import serve


urlpatterns = [
    path('list-vegetables', inventory.ListVegetables, name="list-vegetables"),
    path('create-vegetable', inventory.CreateVegetable, name="create-vegetable"),
    path('update-vegetable', inventory.UpdateVegetable, name="update-vegetable"),
    path('delete-vegetable/<str:pk>',
         inventory.DeleteVegetable, name="delete-vegetable"),
    path('search-vegetables/<str:pk>',
         inventory.SearchVegetables, name="search-vegetables"),
    path('list-harvests', inventory.ListHarvests, name="list-harvests"),
    path('delete-harvest/<str:pk>',
         inventory.DeleteHarvest, name="delete-harvest"),
    path('vegetable-stock', inventory.StockVegetable, name='vegetable-stock'),
    path('merch-stock', inventory.StockMerchandise, name='merch-stock'),
    
    path('user', authentication.GetUser, name="user-info"),
    path('add-user', authentication.AddUser, name="add-user"),
    path('changepass', authentication.ChangePassword, name="change-pass"),
    path('login', authentication.login, name="login"),
    path('logout', authentication.logout, name="logout"),
    
    path('merch-summary', landing.MerchSummary, name="merch-summary"),
    path('merch-detail/<str:pk>', landing.MerchDetail, name="merch-detail"),
    path('public-checkout', transactions.PurchaseMerchandise, name="merch-purchase"),
    
    path('all-produce', landing.AllProduce, name="all-produce"),
    path('mm-checkout', transactions.PurchaseProduce, name="mm-checkout")
]

if not settings.IS_HEROKU:
    urlpatterns.append(url(r'^media/(?P<path>.*)$', serve, 
    {'document_root': settings.MEDIA_ROOT, }))
