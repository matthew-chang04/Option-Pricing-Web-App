from django.db import models

# Create your models here.
class OptionInputs(models.Model):

    stockPrice = models.FloatField() 
    strikePrice = models.FloatField() # Contract Price
    timeToExpiry = models.IntegerField() # time to exipration
    interestRate = models.FloatField() # risk free rate
    volatility = models.FloatField() # volatility

    calcID = models.IntegerField()


class OptionOutputs(models.Model):

    putPrice = models.FloatField()
    callPrice = models.FloatField()


    calcID = models.ForeignKey(OptionInputs, on_delete=models.CASCADE)
