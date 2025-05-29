from rest_framework import viewsets, permissions
from .models import Company
from .serializers import CompanySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MyCompanyView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            company = Company.objects.get(owner=request.user)
            serializer = CompanySerializer(company)
            return Response(serializer.data)
        except Company.DoesNotExist:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
