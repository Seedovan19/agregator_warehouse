from django.db import models
from helpers.models import TrackingModel
from authentication.models import User


def upload_path(instance, filename):
    return '/'.join(['images', str(instance.id), filename]) # может быть instance.name

class Storagecond(TrackingModel, models.Model):
    floor_storage = models.IntegerField()
    shelf_storage = models.IntegerField()
    max_storage_weight = models.IntegerField()
    max_storage_height = models.IntegerField()

    class Meta:
        verbose_name = "Условия хранения" 
        verbose_name_plural = "Условия хранения"


class Features(TrackingModel, models.Model):
    COND_VALUES = (
        ('No value', 'Не задано'),
        ('Heated', 'Отапливаемый'),
        ('Non-heated', 'Неотапливаемый'),
        ('Warmed', 'Утепленный'),
        ('Freezer-WH', 'Морозильный'),
        ('Cold-WH', 'Холодильный'),
    )
    condition = models.CharField(max_length=32, choices=COND_VALUES, default='No value')
    freezer = models.BooleanField()
    freezer_size = models.IntegerField(blank=True, null=True, default=0)
    refrigerator = models.BooleanField() 
    refrigerator_size = models.IntegerField(blank=True, null=True, default=0)
    alcohol = models.BooleanField()
    pharmacy = models.BooleanField()
    dangerous = models.BooleanField()  

    class Meta:
        verbose_name = "Температурные условия и лицензии" 
        verbose_name_plural = "Температурные условия и лицензии"


class Security(TrackingModel, models.Model):
    FIRE_SYS_TYPE = (
        ('No value', 'Не задано'),
        ('Alarm', 'Сигнализация'),
        ('Sprinkler', 'Спринклерная'),
        ('Powder', 'Порошковая'),
        ('Gaz', 'Газовая'),
        ('Hydrant', 'Гидрантная'),
        ('None', 'Нет'),
    )
    # warehouse = models.OneToOneField(
    #     Warehouse,
    #     on_delete=models.CASCADE,
    #     primary_key=True,
    # )
    security_post = models.BooleanField()      
    all_day_security = models.BooleanField()
    video_control = models.BooleanField()
    magnetic_access_locks = models.BooleanField()
    generator = models.BooleanField()
    alarm_system = models.BooleanField()
    fire_system_type = models.CharField(max_length=32, choices=FIRE_SYS_TYPE, default='No value')

    class Meta:
        verbose_name = "Безопасность" 
        verbose_name_plural = "Безопасность"


class Services(TrackingModel, models.Model):
    transport_services = models.BooleanField()
    custom = models.BooleanField()
    crossdock = models.BooleanField()
    palletization = models.BooleanField()
    box_pick = models.BooleanField()

    class Meta:
        verbose_name = "Услуги" 
        verbose_name_plural = "Услуги"


class Workinghours(TrackingModel, models.Model):
    timefrom = models.IntegerField(blank=True, null=True)
    timeto   = models.IntegerField(blank=True, null=True)
    teekday  = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = "График работы" 
        verbose_name_plural = "График работы"


class Logistics(TrackingModel, models.Model):
    leveling_platform = models.BooleanField(verbose_name="Оборудование для выравнивания")
    railways = models.BooleanField(verbose_name="Ж/д пути")
    parking = models.BooleanField(verbose_name="Возможность оставить грузовой транспорт на парковке")
    parking_security = models.BooleanField(verbose_name="Охраняемая парковка")
    parking_cost = models.BooleanField(verbose_name="Стоимость парковки")
    comment = models.CharField(max_length=100, blank=True, null=True, verbose_name="Комментарий")
    
    class Meta:
        verbose_name = "Логистическое сообщение" 
        verbose_name_plural = "Логистическое сообщение"



class Warehouse(TrackingModel, models.Model):
    CLASS_VALUES = (
        ('No value', 'Не задано'),
        ('A+', 'A+'),
        ('A', 'A'),
        ('B', 'B'),
        ('B+', 'B+'),
        ('C', 'C'),
    )

    name = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField (blank=True, null=True, upload_to = upload_path)
    square = models.IntegerField()
    adress = models.CharField(max_length=300)
    shelf_storage_cost = models.IntegerField()
    floor_storage_cost = models.IntegerField()
    description = models.CharField(max_length=500, blank=True, null=True)
    warehouse_class = models.CharField(max_length=100, choices=CLASS_VALUES, default='No value')
    integrated = models.BooleanField()
    wh_lon = models.FloatField(blank=True, null=True)
    wh_lat = models.FloatField(blank=True, null=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    comment = models.CharField(max_length=100, blank=True, null=True)
    storage_conditions = models.ForeignKey(Storagecond, on_delete=models.CASCADE)
    features = models.ForeignKey(Features, on_delete=models.CASCADE)
    security = models.ForeignKey(Security, on_delete=models.CASCADE)
    services = models.ForeignKey(Services, on_delete=models.CASCADE)
    working_hours = models.ForeignKey(Workinghours, on_delete=models.CASCADE)
    logistics = models.ForeignKey(Logistics, on_delete=models.CASCADE)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Склад"
        verbose_name_plural = "Склад"
