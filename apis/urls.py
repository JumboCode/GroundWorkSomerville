from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview),
    path('list-vegetables', views.ListVegetables),
    path('create-vegetable', views.CreateVegetable),
    path('update-vegetable/<str:pk>', views.UpdateVegetable),
    path('delete-vegetable/<str:pk>', views.DeleteVegetable),
]