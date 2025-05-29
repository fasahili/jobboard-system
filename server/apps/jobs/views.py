from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import JobPost
from .serializers import JobPostSerializer

class JobPostViewSet(viewsets.ModelViewSet):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['location', 'employment_type', 'experience_level']

    def get_queryset(self):
        return JobPost.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != "company":
            raise PermissionDenied("Only companies can post jobs.")
        serializer.save(company=user.company)


class MyCompanyJobsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        if hasattr(user, "company"):
            jobs = JobPost.objects.filter(company=user.company)
            serializer = JobPostSerializer(jobs, many=True)
            return Response(serializer.data)
        return Response([], status=status.HTTP_200_OK)
