from django.urls import include, path
from agregator.views import WarehouseImagesRetrieveAPIView, WarehouseListAPIView, WarehouseAPIView, WarehouseDetailAPIView, SurveyResultsListAPIView, SurveyResultsCreate

urlpatterns = [
	path('', WarehouseAPIView.as_view(), name="users-warehouses"),
	path('warehouse-list', WarehouseListAPIView.as_view(), name="warehouses-list"),
	path('surveyresult-list', SurveyResultsListAPIView.as_view(), name="survey-result-list"),
	path('warehouse-detail/<int:id>', WarehouseDetailAPIView.as_view(), name="warehouse-detail"),
	# path('recommendations-retrieve', RecommendationsTopNRetrieve.as_view(), name="recommendations"),
	path('warehouse-detail/images/', WarehouseImagesRetrieveAPIView.as_view(), name="warehouse-detail-photos"),
	path('survey-results-append', SurveyResultsCreate.as_view(), name="survey-results-save"),
]
