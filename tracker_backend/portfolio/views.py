from rest_framework import viewsets,permissions
from .models import Investment
from .serializers import InvestmentSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self,serializer):
        serializer.save(user=self.request.user)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def portfolio_summary(request):
    user = request.user
    investments = Investment.objects.filter(user=user)

    total_invested = 0
    current_value = 0
    asset_breakdown = {'stock': 0, 'bond': 0}  # Keys in lowercase

    for inv in investments:
        invested = (inv.quantity or 0) * (inv.buy_price or 0)
        current = (inv.quantity or 0) * (inv.current_price or inv.buy_price or 0)

        total_invested += invested
        current_value += current

        # ✅ Normalize asset type to lowercase for consistent dict lookup
        asset_type = inv.asset_type.lower()
        if asset_type in asset_breakdown:
            asset_breakdown[asset_type] += current
        else:
            asset_breakdown[asset_type] = current  # Optional fallback

    total_pnl = current_value - total_invested

    return Response({
        'total_invested': round(total_invested, 2),
        'current_value': round(current_value, 2),
        'total_pnl': round(total_pnl, 2),
        'asset_breakdown': {
            'stock': round(asset_breakdown['stock'], 2),
            'bond': round(asset_breakdown['bond'], 2)
        }
    })

 