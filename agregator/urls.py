from django.urls import include, path
from agregator.views import WarehouseImagesRetrieveAPIView, WarehouseListAPIView, WarehouseAPIView, WarehouseDetailAPIView

urlpatterns = [
	path('', WarehouseAPIView.as_view(), name="users-warehouses"),
	path('warehouse-list', WarehouseListAPIView.as_view(), name="warehouses-list"),
	path('warehouse-detail/<int:id>', WarehouseDetailAPIView.as_view(), name="warehouse-detail"),
	path('warehouse-detail/images/<int:warehouse__id>', WarehouseImagesRetrieveAPIView.as_view(), name="warehouse-detail-photos"),
]
