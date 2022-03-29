from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Warehouse 
from .serializers import WarehouseSerializer


class WarehouseAPIView(ListCreateAPIView):
	serializer_class = WarehouseSerializer
	permission_classes = (IsAuthenticated,)

	def perform_create(self, serializer):
		return serializer.save(owner=self.request.user)

	def get_queryset(self):
		return Warehouse.objects.filter(owner=self.request.user)


class WarehouseListAPIView(ListAPIView):
	serializer_class = WarehouseSerializer
	authentication_classes = []

	def get_queryset(self):
		return Warehouse.objects.all()


class WarehouseDetailAPIView(RetrieveUpdateDestroyAPIView):
	serializer_class = WarehouseSerializer
	permission_classes = (IsAuthenticated,)
	lookup_field = 'id'

	def get_queryset(self):
		return Warehouse.objects.filter(owner=self.request.user)


