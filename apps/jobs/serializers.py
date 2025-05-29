from rest_framework import serializers
from .models import JobPost

class JobPostSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)


    class Meta:
        model = JobPost
        fields = '__all__'
        read_only_fields = ['company', 'posted_at']
