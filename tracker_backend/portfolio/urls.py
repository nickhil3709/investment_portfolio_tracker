from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import InvestmentViewSet,portfolio_summary

router = DefaultRouter()
router.register(r'investments',InvestmentViewSet,basename='investment')

urlpatterns = [
    path('',include(router.urls)),
    path('portfolio/summary/', portfolio_summary, name='portfolio-summary'),
]
