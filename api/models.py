from django.db import models

# Create your models here.
class OptionInput(models.Model):
    spot_price = models.FloatField()
    strike_price = models.FloatField()
    interest_rate = models.FloatField()
    volatility = models.FloatField()
    time_to_maturity = models.FloatField()
    price_shock = models.FloatField(null=True)
    volatility_shock = models.FloatField(null=True)

    class Meta:
        unique_together = ('spot_price', 'strike_price', 'interest_rate', 'volatility', 'time_to_maturity')

class OptionOutput(models.Model):
    option_input = models.OneToOneField(OptionInput, on_delete=models.CASCADE)
    call_price = models.FloatField()
    put_price = models.FloatField()