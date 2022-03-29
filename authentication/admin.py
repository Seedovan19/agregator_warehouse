from django.contrib import admin
from django.contrib.auth.admin import UserAdmin  as BaseUserAdmin
from authentication.models import User as MyUser


from agregator.models import Warehouse
from agregator.models import Storagecond
from agregator.models import Features
from agregator.models import Security
from agregator.models import Services
from agregator.models import Workinghours
from agregator.models import Logistics

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


class WarehouseAdmin(admin.ModelAdmin):
    list_display = ('name', 'square', 'adress')
    fieldsets = (
        (None, {'fields': ('name', 'square', 'adress')}),
    )

    search_fields =  ('name', 'square', 'adress')
    ordering = ('name', 'square', 'adress')
    filter_horizontal = ()


admin.site.register(MyUser, UserAdmin)

admin.site.register(Warehouse, WarehouseAdmin)
admin.site.register(Storagecond)
admin.site.register(Features)
admin.site.register(Security)
admin.site.register(Services)
admin.site.register(Workinghours)
admin.site.register(Logistics)