from rest_framework import serializers
from .models import Project, Cost

class CostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    costs = CostSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
