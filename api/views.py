from django.shortcuts import render
from rest_framework import views
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from .models import OptionInput, OptionOutput
from .serializers import OptionInputSerializer
from .utils import black_scholes
import numpy as np

# Create your views here.

class OptionPriceView(APIView):
    def post(self, request):
        serializer = OptionInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Ensure OptionInput exists
        option_input, created = OptionInput.objects.get_or_create(**serializer.validated_data)

        # Check for existing OptionOutput
        option_output = OptionOutput.objects.filter(option_input=option_input).first()
        if option_output:
            return Response(
                {
                    "call_price": option_output.call_price,
                    "put_price": option_output.put_price,
                },
                status=status.HTTP_200_OK,
            )

        # Otherwise calculate and store
        call_price, put_price = black_scholes(
            option_input.spot_price,
            option_input.strike_price,
            option_input.time_to_maturity,
            option_input.interest_rate,
            option_input.volatility,
        )
        option_output = OptionOutput.objects.create(
            option_input=option_input,
            call_price=call_price,
            put_price=put_price,
        )

        return Response(
            {
                "call_price": option_output.call_price,
                "put_price": option_output.put_price,
            },
            status=status.HTTP_201_CREATED,
        )
    

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
