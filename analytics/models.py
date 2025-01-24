from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()

class Cost(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='costs')
    category = models.CharField(max_length=255)  # e.g., "Labor", "Materials"
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
