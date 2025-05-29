from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobPostViewSet, MyCompanyJobsView

router = DefaultRouter()
router.register('', JobPostViewSet, basename='jobs')

urlpatterns = [
    path('', include(router.urls)),
    path('my/', MyCompanyJobsView.as_view(), name='my-jobs'),

]
