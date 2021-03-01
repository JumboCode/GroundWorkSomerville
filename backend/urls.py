from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    url('admin/', admin.site.urls),
    url('', include('apis.urls')),
    url('', index, name="Index")
]
