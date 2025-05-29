from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source="job.title", read_only=True)
    job_company_id = serializers.IntegerField(source="job.company.id", read_only=True)
    job_company_name = serializers.CharField(source="job.company.name", read_only=True)
    applicant_username = serializers.CharField(source="applicant.username", read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['applicant', 'applied_at', 'applicant_username']

