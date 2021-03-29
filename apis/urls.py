from django.urls import path
from . import views
from django.conf.urls import include, url
from django.conf import settings
from django.views.static import serve


urlpatterns = [
    path('list-vegetables', views.ListVegetables, name="list-vegetables"),
    path('create-vegetable', views.CreateVegetable, name="create-vegetable"),
    path('update-vegetable/<str:pk>', views.UpdateVegetable),
    path('delete-vegetable/<str:pk>', views.DeleteVegetable, name="delete-vegetable"),
    path('search-vegetables/<str:pk>', views.SearchVegetables, name="search-vegetables"),
    path('list-harvests', views.ListHarvests, name="list-harvests"),
    path('create-harvest', views.CreateHarvest, name="create-harvest"),
    path('delete-harvest/<str:pk>', views.DeleteHarvest, name="delete-harvest"),    
    path('create-purchase', views.CreatePurchase, name='create-purchase'),
    path('vegetable-stock', views.StockVegetable, name='vegetable-stock'),
    path('merch-stock', views.StockMerchandise, name='merch-stock'),
    path('user', views.GetUser, name="user-info"),
    path('add-user', views.AddUser, name="add-user"),
    path('changepass', views.ChangePassword, name="change-pass"),
    path('login', views.login, name="login"),
    path('add-product', views.AddProduct, name="add-product"),
    path('logout', views.logout, name="logout")
]

if not settings.IS_HEROKU:
    urlpatterns.append(url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,}))
