from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, MyCompanyView

router = DefaultRouter()
router.register('', CompanyViewSet, basename='companies')


urlpatterns = [
    path('my/', MyCompanyView.as_view(), name='my-company'),
    path('', include(router.urls)),
]

