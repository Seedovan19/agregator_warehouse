from rest_framework.serializers import ModelSerializer
from .models import Logistics, Warehouse
from .models import Storagecond
from .models import Features
from .models import Security
from .models import Services
from .models import Workinghours
from .models import Logistics
from .models import WarehouseImages
from .models import SurveyResults



class StoragecondSerializer(ModelSerializer):
    class Meta:
        model = Storagecond
        fields = '__all__'

class FeaturesSerializer(ModelSerializer):
    class Meta:
        model = Features
        fields = '__all__'

class SecuritySerializer(ModelSerializer):
    class Meta:
        model = Security
        fields = '__all__'

class ServicesSerializer(ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'

class WorkinghoursSerializer(ModelSerializer):
    class Meta:
        model = Workinghours
        fields = '__all__'

class LogisticsSerializer(ModelSerializer):
    class Meta:
        model = Logistics
        fields = '__all__'


class WarehouseSerializer(ModelSerializer):
    storage_conditions = StoragecondSerializer()
    features = FeaturesSerializer()
    security = SecuritySerializer()
    services = ServicesSerializer()
    working_hours = WorkinghoursSerializer()
    logistics = LogisticsSerializer()

    class Meta:
        model = Warehouse
        fields = '__all__'


class ImagesSerializer(ModelSerializer):
    
    class Meta:
        model = WarehouseImages
        fields = '__all__'


class SurveyResultsSerializer(ModelSerializer):
    class Meta:
        model = SurveyResults
        fields = '__all__'
