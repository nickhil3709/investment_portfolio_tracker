# portfolio/management/commands/update_prices.py
from django.core.management.base import BaseCommand
from portfolio.models import Investment
from portfolio.utils import fetch_stock_price

class Command(BaseCommand):
    help = 'Update current prices for all investments'

    def handle(self, *args, **kwargs):
        investments = Investment.objects.all()
        for inv in investments:
            price = fetch_stock_price(inv.symbol)
            if price:
                inv.current_price = price
                inv.save()
                self.stdout.write(self.style.SUCCESS(f"{inv.symbol}: ₹{price}"))
            else:
                self.stdout.write(self.style.WARNING(f"Could not fetch price for {inv.symbol}"))
