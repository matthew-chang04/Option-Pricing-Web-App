from rest_framework import serializers
from .models import OptionInputs, OptionOutputs

class OptionInputSerializer(serializers.ModelSerializer):

    class Meta:
        model = OptionInputs
        fields = '__all__'

class OptionOutputSerializer(serializers.ModelSerializer):

    class Meta:
        model = OptionOutputs
        fields = ['volShock', 'stockPriceShock']