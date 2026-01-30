
from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    coins = models.IntegerField(default=0)
    trust_score = models.IntegerField(default=100)

class TransitReport(models.Model):
    REPORT_TYPES = [
        ('CROWD', 'Crowd'),
        ('DELAY', 'Delay'),
        ('QUEUE', 'Queue'),
        ('WEATHER', 'Weather'),
    ]
    type = models.CharField(max_length=20, choices=REPORT_TYPES)
    location = models.CharField(max_length=200)
    description = models.TextField()
    verified = models.BooleanField(default=False)
    consensus_count = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
