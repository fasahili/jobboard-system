from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions
from .models import JobPost
from .serializers import JobPostSerializer
from rest_framework.exceptions import PermissionDenied


class JobPostViewSet(viewsets.ModelViewSet):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['location', 'employment_type', 'experience_level']

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != "company":
            raise PermissionDenied("Only companies can post jobs.")
        serializer.save(company=user.company)
