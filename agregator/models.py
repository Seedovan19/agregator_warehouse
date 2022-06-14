from django.db import models
from helpers.models import TrackingModel
from authentication.models import User

def upload_path(instance, filename):
    return '/'.join(['images', str(instance.warehouse.id), filename]) # может быть instance.name

def upload_path_for_main_img(instance, filename):
    return '/'.join(['images', str(instance.id), filename]) # может быть instance.name

class Storagecond(TrackingModel, models.Model):
    PALLET_QUANTITY = (
        (0, 'Не задано'),
        (1, 'Меньше 50'),
        (2, '50-250'),
        (3, '250-500'),
        (4, '500-1000'),
        (5, 'больше 1000'),
    )

    pallet_storage_capacity = models.IntegerField(choices=PALLET_QUANTITY, default=0, verbose_name='Вместимость (палет)')
    pallet_storage_cost = models.FloatField(default=0, verbose_name='Стоимость хранения палет (с НДС)')
    pallet_handling_cost = models.FloatField(default=0, verbose_name='Стоимость приемки/отгрузки палет (с НДС)')
    max_storage_weight = models.IntegerField(default=1000)
    max_storage_height = models.FloatField(default=1.7)
    bulky_cargo_storage = models.BooleanField(default=False, verbose_name='Возможность хранения крупногабаритного груза') #TODO: в нейронке отразить

    class Meta:
        verbose_name = "Условия хранения" 
        verbose_name_plural = "Условия хранения"


class Features(TrackingModel, models.Model):
    COND_VALUES = (
        ('No value', 'Не задано'),
        ('Regulated', 'Регулируемый температурный режим'),
        ('Heated', 'Отапливаемый'),
        ('Warmed', 'Утепленный'),
        ('Non-heated', 'Неотапливаемый'),
        ('Freezer-WH', 'Морозильный'),
        ('Cold-WH', 'Холодильный'),
    )
    condition = models.CharField(max_length=32, choices=COND_VALUES, default='No value')
    freezer = models.BooleanField()
    freezer_size = models.IntegerField(blank=True, null=True, default=0)
    refrigerator = models.BooleanField() 
    refrigerator_size = models.IntegerField(blank=True, null=True, default=0)
    alcohol = models.BooleanField(default=False, null=False)
    pharmacy = models.BooleanField(default=False, null=False)
    food = models.BooleanField(default=False, null=False)
    dangerous = models.BooleanField(default=False, null=False)  

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
    WEEKDAYS = (
        (1, 'Monday'),
        (2, 'Tuesday'),
        (3, 'Wednesday'),
        (4, 'Thursday'),
        (5, 'Friday'),
        (6, 'Saturday'),
        (7, 'Sunday'),
    )

    time_from = models.IntegerField(verbose_name="Время начала работы (09:00 = 900)", blank=True, null=True, default=0)
    time_to = models.IntegerField(verbose_name="Время окончания работы (если 24 часа, то значение поля - 2400)", blank=True, null=True, default=0)
    weekday  = models.IntegerField(verbose_name="До какого дня недели", blank=True, null=True, choices=WEEKDAYS, default=5)
    friday_time_from = models.IntegerField(verbose_name="Время начала работы в пятницу", blank=True, null=True, default=0)
    friday_time_to = models.IntegerField(verbose_name="Время окончания работы в пятницу", blank=True, null=True, default=0)
    saturday_time_from = models.IntegerField(verbose_name="Время начала работы в субботу", blank=True, null=True, default=0)
    saturday_time_to = models.IntegerField(verbose_name="Время окончания работы в субботу", blank=True, null=True, default=0)
    sunday_time_from = models.IntegerField(verbose_name="Время начала работы в воскресенье", blank=True, null=True, default=0)
    sunday_time_to = models.IntegerField(verbose_name="Время окончания работы в воскресенье", blank=True, null=True, default=0)
    break_flag = models.BooleanField(verbose_name="Наличие перерыва", default=False)
    break_from = models.IntegerField(verbose_name="Время начала перерыва", blank=True, null=True, default=0)
    break_to = models.IntegerField(verbose_name="Время окончания перерыва", blank=True, null=True, default=0)
    


    class Meta:
        verbose_name = "График работы" 
        verbose_name_plural = "График работы"


class Logistics(TrackingModel, models.Model):
    leveling_platform = models.BooleanField(verbose_name="Оборудование для выравнивания")
    railways = models.BooleanField(verbose_name="Ж/д пути")
    parking = models.BooleanField(verbose_name="Возможность оставить грузовой транспорт на парковке")
    parking_security = models.BooleanField(verbose_name="Охраняемая парковка")
    parking_cost = models.IntegerField(verbose_name="Стоимость парковки", blank=True, null=True, default=0)
    comment = models.CharField(max_length=100, blank=True, null=True, verbose_name="Комментарий")
    
    class Meta:
        verbose_name = "Логистическое сообщение" 
        verbose_name_plural = "Логистическое сообщение"



class Warehouse(TrackingModel, models.Model):
    # TODO: исправить на A+, A, B, C, D
    CLASS_VALUES = (
        ('No value', 'Не задано'),
        ('A+', 'A+'),
        ('A', 'A'),
        ('B', 'B'),
        ('B+', 'B+'),
        ('C', 'C'),
    )
    WAREHOUSE_VARIANT = (
        ('No value', 'Не задано'),
        ('Sharing', 'Склад от компании'),
        ('3pl', '3pl-оператор'),
        ('Storage_only_wh', 'Склад ответственного хранения'),
    )

    name = models.CharField(max_length=100, blank=True, null=True)
    image = models.FileField(blank=True, upload_to=upload_path_for_main_img)
    adress = models.CharField(max_length=300)
    description = models.CharField(max_length=2000, blank=True, null=True)
    warehouse_class = models.CharField(max_length=100, choices=CLASS_VALUES, default='No value')
    warehouse_variant = models.CharField(max_length=100, choices=WAREHOUSE_VARIANT, default='No value')
    long_term_commitment = models.BooleanField(default=False)
    office_premises = models.BooleanField(default=False, blank=True, null=True, verbose_name="Наличие офисных помещений")
    office_premises_square = models.IntegerField(blank=True, null=True, default=0, verbose_name="Площадь административно-бытовой зоны (м2)")
    domestic_premises = models.BooleanField(default=False, blank=True, null=True, verbose_name="Наличие бытовых помещений")
    integrated = models.BooleanField()
    wh_latitude = models.FloatField(blank=False, null=False, default=0, verbose_name="Широта")
    wh_longitude = models.FloatField(blank=False, null=False, default=0, verbose_name="Долгота")
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


class WarehouseImages(TrackingModel, models.Model):
    warehouse = models.ForeignKey(Warehouse, default=None, on_delete=models.CASCADE)
    images = models.FileField(null=True, upload_to = upload_path)
 
    class Meta:
        verbose_name = "Фото склада" 
        verbose_name_plural = "Фото склада"


class Application(models.Model):
    warehouse = models.ForeignKey(Warehouse, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, blank=True, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    # тип товара можно добавить
    # Необходимая площадь или количество палет
    # Когда потребуется склад
    # Комментарий
    class Meta:
        verbose_name = "Заявки складу" 
        verbose_name_plural = "Заявки складу"



class SurveyResults(models.Model):
    COND_VALUES = (
        ('No value', 'Не задано'),
        ('Regulated', 'Регулируемый температурный режим'),
        ('Heated', 'Отапливаемый'),
        ('Warmed', 'Утепленный'),
        ('Non-heated', 'Неотапливаемый'),
        ('Freezer-WH', 'Морозильный'),
        ('Cold-WH', 'Холодильный'),
    )
    CLASS_VALUES = (
        ('No value', 'Не задано'),
        ('A+', 'A+'),
        ('A', 'A'),
        ('B+', 'B+'),
        ('B', 'B'),
        ('C', 'C'),
    )
    
    product_type = models.CharField(max_length=100, blank=True, null=True)
    condition = models.CharField(max_length=32, choices=COND_VALUES, default='No value')
    freezer = models.BooleanField()
    refrigerator = models.BooleanField() 
    alcohol = models.BooleanField(default=False, null=False)
    pharmacy = models.BooleanField(default=False, null=False)
    food = models.BooleanField(default=False, null=False)
    dangerous = models.BooleanField(default=False, null=False)  
    warehouse_class = models.CharField(max_length=100, choices=CLASS_VALUES, default='No value')
    wh_lon = models.FloatField(blank=True, null=True)
    wh_lat = models.FloatField(blank=True, null=True)
    pallet_storage_capacity = models.IntegerField(default=0, verbose_name='Количество палет')
    transport_services = models.BooleanField()
    box_pick = models.BooleanField()
    custom = models.BooleanField()
    crossdock = models.BooleanField()
    palletization = models.BooleanField()
    long_term_commitment = models.BooleanField(default=False) #TODO: добавить на фронте
    leveling_platform = models.BooleanField(default=False, verbose_name="Оборудование для выравнивания")
    railways = models.BooleanField(default=False, verbose_name="Ж/д пути")
    comment = models.CharField(max_length=2000, blank=True, null=True) #TODO: до сюда
    name = models.CharField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = "Запросы" 
        verbose_name_plural = "Запросы"



