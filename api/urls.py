from django.urls import path, include
from django.contrib import admin
from .views import get_pricing, home

urlpatterns = [
    path('', home, name='home'),
    path('calculate/', get_pricing, name='pricing_options')
]
