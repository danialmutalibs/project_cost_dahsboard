from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, CostViewSet

router = DefaultRouter()
router.register('projects', ProjectViewSet)
router.register('costs', CostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
