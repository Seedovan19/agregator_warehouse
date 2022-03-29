from django.urls import path
from agregator.views import WarehouseListAPIView, WarehouseAPIView, WarehouseDetailAPIView

urlpatterns = [
	path('', WarehouseAPIView.as_view(), name="users-warehouses"),
	path('warehouse-list', WarehouseListAPIView.as_view(), name="warehouses-list"),
	path('<int:id>', WarehouseDetailAPIView.as_view(), name="warehouse-retrieve-update-delete"),
]
