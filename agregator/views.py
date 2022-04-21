from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
# from analytics.mixins import ObjectViewMixin
from analytics.signals import object_viewed_signal

from .models import Warehouse, WarehouseImages
from .serializers import ImagesSerializer, WarehouseSerializer


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

	filterset_fields = ['warehouse_class', 'storage_conditions__pallet_storage_capacity', 'features__alcohol', 'features__freezer', 'features__refrigerator', 'features__pharmacy', 'features__food', 'features__dangerous', 'services__palletization', 'services__box_pick', 'services__transport_services', 'services__custom', 'services__crossdock']

	def get_queryset(self):
		return Warehouse.objects.all()



class WarehouseDetailAPIView(RetrieveAPIView):
	serializer_class = WarehouseSerializer
	queryset = Warehouse.objects.all()
	authentication_classes = []
	lookup_field = 'id'

	def get(self, request, *args, **kwargs):
		instance = self.get_object()
		
		object_viewed_signal.send(instance.__class__, instance=instance, request=self.request)
		return self.retrieve(request, *args, **kwargs)


class WarehouseImagesRetrieveAPIView(ListAPIView):
	serializer_class = ImagesSerializer
	queryset = WarehouseImages.objects.all()
	authentication_classes = []
	lookup_field = 'warehouse__id'

	def get_queryset(self):
		return WarehouseImages.objects.all()



# Разными запросами изменяет, выдает, удаляет детали склада конкретного пользователя
class WarehouseRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
	serializer_class = WarehouseSerializer
	permission_classes = (IsAuthenticated,)
		
	authentication_classes = []

	lookup_field = 'id'

	def get_queryset(self):
		return Warehouse.objects.filter(owner=self.request.user)


# class ApplicationCreateView(CreateAPIView):
