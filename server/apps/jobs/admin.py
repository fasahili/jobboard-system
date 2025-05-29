from django.contrib import admin
from .models import JobPost

@admin.register(JobPost)
class JobPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'employment_type', 'experience_level', 'posted_at')
    list_filter = ('employment_type', 'experience_level', 'location', 'posted_at')
    search_fields = ('title', 'description', 'location', 'company__name')
