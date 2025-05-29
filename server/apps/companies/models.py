from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Company(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name
