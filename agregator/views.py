from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
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

	filterset_fields = ['id', 'name', 'adress', 'warehouse_class', 'features__alcohol', 'services__transport_services']

	def get_queryset(self):
		return Warehouse.objects.all()


# Разными запросами изменяет, выдает, удаляет детали склада
class WarehouseDetailAPIView(RetrieveUpdateDestroyAPIView):
	serializer_class = WarehouseSerializer
	permission_classes = (IsAuthenticated,)
	lookup_field = 'id'

	def get_queryset(self):
		return Warehouse.objects.filter(owner=self.request.user)


