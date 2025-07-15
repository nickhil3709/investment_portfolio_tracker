from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import InvestmentViewSet,portfolio_summary, predict_view,simulate_sip_view,rebalance_portfolio

router = DefaultRouter()
router.register(r'investments',InvestmentViewSet,basename='investment')

urlpatterns = [
    path('',include(router.urls)),
    path('portfolio/summary/', portfolio_summary, name='portfolio-summary'),
    path('predict/', predict_view,name='predict-view'),
    path('sip/', simulate_sip_view, name='sip-simulator'),
    path('portfolio/rebalance/', rebalance_portfolio),

]
