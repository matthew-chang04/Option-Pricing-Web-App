from django.urls import path, include
from django.contrib import admin
from .views import OptionPriceView, OptionHeatmapView

urlpatterns = [
    path("api/option/price/", OptionPriceView.as_view(), name="option_price"),
    path("api/option/heatmap/", OptionHeatmapView.as_view(), name="option_heatmap")
]
