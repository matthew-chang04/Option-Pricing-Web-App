from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from django.http import JsonResponse
import json
from rest_framework import status
from .models import OptionInputs, OptionOutputs
from .serializers import OptionOutputSerializer, OptionInputSerializer
from .utils import black_scholes
# Create your views here.

def home(request):
    return render(request, 'api/index.html')


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

