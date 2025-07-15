from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from .models import OptionInput, OptionOutput
from .serializers import OptionInputSerializer
from .utils import black_scholes
import numpy as np

# Create your views here.

class OptionPriceView(views.APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OptionInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            call_price, put_price = black_scholes(data['spot_price'], data['strike_price'], data['time_to_maturity'], data['interest_rate'], data['volatility'])

            option_input = serializer.save()
            OptionOutput.objects.create(option_input=option_input, call_price=call_price, put_price=put_price)
            
            return Response({"call_price": call_price, "put_price": put_price})
        return Response(serializer.errors, status=400)

class OptionHeatmapView(views.APIView):

    permission_classes = [AllowAny]
    def post(self, request):
        serializer = OptionInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            spot_values = np.linspace(data['spot_price'] - data['price_shock'], data['spot_price'] + data['price_shock'], 10)
            vol_values = np.linspace(data['volatility'] - data['volatility_shock'], data['volatility'] + data['volatility_shock'], 10)
            
            call_prices = []
            put_prices = []
            idx = 0
            for sigma in vol_values:
                call_prices.append({'id': sigma, "data" : []})
                put_prices.append({'id': sigma, "data" : []})

                for S in spot_values:
                    call, put = black_scholes(S, data['strike_price'], data['time_to_maturity'], data['interest_rate'], sigma)
                    call_prices[idx]["data"].append({'id': S, "data": [ {'x':sigma, 'y':call} ] })
                    put_prices[idx]["data"].append({'id': S, "data": [ {'x':sigma, 'y':put} ] })
                idx += 1

            return Response({"call_heatmap": call_prices, "put_heatmap": put_prices})
        return Response(serializer.errors, status=400)
