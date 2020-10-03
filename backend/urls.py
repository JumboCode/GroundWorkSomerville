from django.conf.urls import url
from django.contrib import admin

from django.urls import path

from .views import index

urlpatterns = [
    path('', index, name='index'),
    url(r'^admin/', admin.site.urls),
]
