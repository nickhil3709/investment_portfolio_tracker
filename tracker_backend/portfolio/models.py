from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Investment(models.Model):
    ASSET_TYPE = [
        ('STOCK', 'Stock'),
        ('BOND', 'Bond')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    quantity = models.FloatField()
    buy_price = models.FloatField()
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPE)
    buy_date = models.DateField()

    def __str__(self):
        return f"{self.symbol} - {self.user.username}"