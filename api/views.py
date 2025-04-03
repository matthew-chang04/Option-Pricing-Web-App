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
            
            call_prices = np.zeros((10, 10))
            put_prices = np.zeros((10, 10))
            
            for i, S in enumerate(spot_values):
                for j, sigma in enumerate(vol_values):
                    call_prices[i, j], put_prices[i, j] = black_scholes(S, data['strike_price'], data['time_to_maturity'], data['interest_rate'], sigma)
        
            return Response({"call_heatmap": call_prices.tolist(), "put_heatmap": put_prices.tolist()})
        return Response(serializer.errors, status=400)
'''  
@api_view(['POST'])
def get_pricing(request):
    data = json.loads(request.body)

    call_price, put_price = black_scholes(
        float(data['stockPrice']),
        float(data['strikePrice']),
        float(data['timeToExpiry']),
        float(data['interestRate']),
        float(data['volatility']),
    )

    calculation = OptionOutputs.objects.create(
        call_price = data['callPrice'],
        put_price = data['putPrice']
    )

    return JsonResponse(calculation)
'''
