from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
admin.autodiscover()

urlpatterns = [

    url(r'^admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('', include('apis.urls'))
]
