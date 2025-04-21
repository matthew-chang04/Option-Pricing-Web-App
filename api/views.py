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
            call_price, put_price = black_scholes(data['spot_price'], data['strike_price'], data['time_to_maturity'], data['interest_rate'],data['volatility'])
            
            
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
            spot_values = np.linspace(data['spot_range_min'], data['spot_range_max'], 10)
            vol_values = np.linspace(data['vol_range_min'], data['vol_range_max'], 10)
            
            call_prices = []
            put_prices = []
            
            for S in spot_values:
                for sigma in vol_values:
                    call, put = black_scholes(S, data['strike_price'], data['time_to_maturity'], data['interest_rate'], sigma)
                    call_prices.append({'volatility':sigma, 'spot_price':S, 'price':call})
                    put_prices.append({'volatility':sigma, 'spot_price':S, 'price':put})

        
            return Response({"call_heatmap": call_prices, "put_heatmap": put_prices})
        return Response(serializer.errors, status=400)
