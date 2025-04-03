from django.db import models

# Create your models here.
class OptionInput(models.Model):
    spot_price = models.FloatField()
    strike_price = models.FloatField()
    interest_rate = models.FloatField()
    volatility = models.FloatField()
    time_to_maturity = models.FloatField()
    spot_range_min = models.FloatField()
    spot_range_max = models.FloatField()
    vol_range_min = models.FloatField()
    vol_range_max = models.FloatField()

class OptionOutput(models.Model):
    option_input = models.OneToOneField(OptionInput, on_delete=models.CASCADE)
    call_price = models.FloatField()
    put_price = models.FloatField()