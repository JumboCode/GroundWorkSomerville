from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('list-vegetables', views.ListVegetables, name="list-vegetables"),
    path('create-vegetable', views.CreateVegetable, name="create-vegetable"),
    path('delete-vegetable/<str:pk>', views.DeleteVegetable, name="delete-vegetable"),
    path('list-harvests', views.ListHarvests, name="list-harvests"),
    path('create-harvest', views.CreateHarvest, name="create-harvest"),
    path('delete-harvest/<str:pk>', views.DeleteHarvest, name="delete-harvest"),
]
