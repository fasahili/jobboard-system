from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Application
from .serializers import ApplicationSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.role == 'admin':
            return Application.objects.all()
        elif user.role == 'company':
            return Application.objects.filter(job__company__owner=user)
        return Application.objects.filter(applicant=user)

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

    def update(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()

        if user.role != 'company' or instance.job.company.owner != user:
            raise PermissionDenied("You can only manage applications to your own jobs.")

        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()

        if user.role != 'company' or instance.job.company.owner != user:
            raise PermissionDenied("You can only update applications to your own jobs.")

        return super().partial_update(request, *args, **kwargs)
