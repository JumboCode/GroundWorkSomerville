from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

index = TemplateView.as_view(template_name="index.html")


