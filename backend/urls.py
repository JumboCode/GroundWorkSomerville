from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from .views import index
admin.autodiscover()

urlpatterns = [
<<<<<<< HEAD
    url(r'^admin/', admin.site.urls),
    path('', include('apis.urls')),
    path('api-auth/', include('rest_framework.urls')),
    url('rest-auth/', include('rest_auth.urls')),
    path('', include('apis.urls'))
=======
    url('admin/', admin.site.urls),
    url('', include('apis.urls')),
    url('', index, name="Index")
>>>>>>> 53eb6c1a96f8140dea8a2792d6cf513e82f0dc63
]
