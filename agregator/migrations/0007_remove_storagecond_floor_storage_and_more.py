# Generated by Django 4.0.3 on 2022-04-12 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0006_warehouse_warehouse_variant_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storagecond',
            name='floor_storage',
        ),
        migrations.RemoveField(
            model_name='storagecond',
            name='shelf_storage',
        ),
        migrations.RemoveField(
            model_name='warehouse',
            name='floor_storage_cost',
        ),
        migrations.RemoveField(
            model_name='warehouse',
            name='shelf_storage_cost',
        ),
        migrations.RemoveField(
            model_name='warehouse',
            name='square',
        ),
        migrations.AddField(
            model_name='storagecond',
            name='pallet_handling_cost',
            field=models.IntegerField(default=0, verbose_name='Стоимость приемки/отгрузки паллет (с НДС)'),
        ),
        migrations.AddField(
            model_name='storagecond',
            name='pallet_storage_capacity',
            field=models.IntegerField(default=0, verbose_name='Вместимость (паллет)'),
        ),
        migrations.AddField(
            model_name='storagecond',
            name='pallet_storage_cost',
            field=models.IntegerField(default=0, verbose_name='Стоимость хранения паллет (с НДС)'),
        ),
    ]
