from django.urls import include, path
from agregator.views import WarehouseImagesRetrieveAPIView, WarehouseListAPIView, WarehouseAPIView, WarehouseDetailAPIView, RecommendationsTopNRetrieve

urlpatterns = [
	path('', WarehouseAPIView.as_view(), name="users-warehouses"),
	path('warehouse-list', WarehouseListAPIView.as_view(), name="warehouses-list"),
	path('warehouse-detail/<int:id>', WarehouseDetailAPIView.as_view(), name="warehouse-detail"),
	path('recommendations-retrieve', RecommendationsTopNRetrieve.as_view(), name="recommendations"),
	path('warehouse-detail/images/', WarehouseImagesRetrieveAPIView.as_view(), name="warehouse-detail-photos"),
]
