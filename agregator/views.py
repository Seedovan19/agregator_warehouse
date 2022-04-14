from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import F
from django.db import models


from .models import Warehouse 
from .serializers import WarehouseSerializer


# Создает и выводит для конкретного пользователя его склады (запросами GET, POST)
class WarehouseAPIView(ListCreateAPIView): 
	serializer_class = WarehouseSerializer
	permission_classes = (IsAuthenticated,)

	def perform_create(self, serializer):
		return serializer.save(owner=self.request.user)

	def get_queryset(self):
		return Warehouse.objects.filter(owner=self.request.user)



# Выводит список складов всех пользователей
class WarehouseListAPIView(ListAPIView):
	serializer_class = WarehouseSerializer
	
	authentication_classes = []
	filter_backends = [DjangoFilterBackend]

	filterset_fields = ['warehouse_class' , 'features__alcohol', 'features__freezer', 'features__refrigerator', 'features__pharmacy', 'features__food', 'features__dangerous', 'services__palletization', 'services__box_pick', 'services__transport_services', 'services__custom', 'services__crossdock']

	def get_queryset(self):
		return Warehouse.objects.all()


# Разными запросами изменяет, выдает, удаляет детали склада
class WarehouseDetailAPIView(RetrieveUpdateDestroyAPIView):
	serializer_class = WarehouseSerializer
	permission_classes = (IsAuthenticated,)
	lookup_field = 'id'

	def get_queryset(self):
		return Warehouse.objects.filter(owner=self.request.user)


