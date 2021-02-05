from rest_framework import serializers
from .models import Vegetable, Harvest

class VegetableSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vegetable
    fields = '__all__'

class HarvestSerializer(serializers.ModelSerializer):
  class Meta:
    model = Harvest
    fields = '__all__'
