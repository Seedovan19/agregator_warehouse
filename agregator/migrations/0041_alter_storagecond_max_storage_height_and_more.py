# Generated by Django 4.0.3 on 2022-06-03 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0040_alter_storagecond_pallet_storage_capacity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storagecond',
            name='max_storage_height',
            field=models.FloatField(default=1.7),
        ),
        migrations.AlterField(
            model_name='storagecond',
            name='max_storage_weight',
            field=models.IntegerField(default=1200),
        ),
        migrations.AlterField(
            model_name='storagecond',
            name='pallet_storage_capacity',
            field=models.IntegerField(choices=[(0, 'Не задано'), (1, 'Меньше 50'), (2, '50-250'), (3, '250-500'), (4, '500-1000'), (5, 'больше 1000')], default=0, verbose_name='Вместимость (палет)'),
        ),
    ]
