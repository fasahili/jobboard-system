from django.db import models
from django.contrib.auth import get_user_model
from apps.jobs.models import JobPost

User = get_user_model()

class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='applications')
    cv = models.FileField(upload_to='cv/')
    message = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['applicant', 'job']

    def __str__(self):
        return f"{self.applicant.username} applied to {self.job.title}"


