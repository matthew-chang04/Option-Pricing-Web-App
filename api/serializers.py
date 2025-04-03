from rest_framework import serializers
from .models import OptionInput, OptionOutput

class OptionInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionInput
        fields = '__all__'

class OptionOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionOutput
        fields = '__all__'
