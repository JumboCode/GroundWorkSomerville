from django.conf.urls import url
from django.contrib import admin

from django.urls import path, include

from .views import index

urlpatterns = [
    path('', include('vegetables.urls')),
    url(r'^admin/', admin.site.urls),
]
