from django.contrib import admin
from django.contrib.auth.admin import UserAdmin  as BaseUserAdmin
from authentication.models import User as MyUser


from agregator.models import Warehouse
from agregator.models import WarehouseImages
from agregator.models import Storagecond
from agregator.models import Features
from agregator.models import Security
from agregator.models import Services
from agregator.models import Workinghours
from agregator.models import Logistics
from agregator.models import Application

# Register your models here.

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email')

    fieldsets = (
        (None, {'fields': ('username', 'email','password')}),

        ('Permissions', {'fields': ('is_admin',)}),
    )

    search_fields =  ('username', 'email')
    ordering = ('username','email')

    filter_horizontal = ()




class WarehouseImageAdmin(admin.StackedInline):
    model = WarehouseImages
 
@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    inlines = [WarehouseImageAdmin]

    list_display = ('name', 'adress', 'id')

    search_fields =  ('name', 'adress', 'id')
    ordering = ('name', 'adress')
    filter_horizontal = ()
 
    class Meta:
       model = Warehouse
 
@admin.register(WarehouseImages)
class WarehouseImageAdmin(admin.ModelAdmin):
    pass


admin.site.register(MyUser, UserAdmin)
admin.site.register(Storagecond)
admin.site.register(Features)
admin.site.register(Security)
admin.site.register(Services)
admin.site.register(Workinghours)
admin.site.register(Logistics)
admin.site.register(Application)