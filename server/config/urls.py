"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.generic import TemplateView
from django.urls import re_path

schema_view = get_schema_view(
    openapi.Info(
        title="Job Board API – Swagger & Redoc Docs",
        default_version='v1',
        description="""
🔧 **Professional Job Board System**

This API provides the backend for a complete job board platform with:

- 📌 User registration for Companies and Job Seekers
- 🏢 Job creation and management by companies
- 🧑‍💼 Applications submitted by job seekers with CV upload
- 🎯 Application status tracking: Pending / Accepted / Rejected
- 🔐 Role-based access control: `Admin`, `Company`, `Job Seeker`
- 📄 Full documentation via Swagger and Redoc

> 🚀 Built with Django REST Framework and JWT Authentication  
> ⚙️ All operations are permission-protected and can be tested directly here.
""",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

# test 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('apps.accounts.urls')),
    path('api/companies/', include('apps.companies.urls')),
    path('api/jobs/', include('apps.jobs.urls')),
    path('api/applications/', include('apps.applications.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
       re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),


]
