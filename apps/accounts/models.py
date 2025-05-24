from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        COMPANY = 'company', 'Company'
        JOB_SEEKER = 'job_seeker', 'Job Seeker'

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.JOB_SEEKER)

    def __str__(self):
        return self.username
