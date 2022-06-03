# Generated by Django 4.0.3 on 2022-06-03 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0041_alter_storagecond_max_storage_height_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workinghours',
            name='time_from',
            field=models.IntegerField(blank=True, null=True, verbose_name='Время начала работы (09:00 = 900)'),
        ),
        migrations.AlterField(
            model_name='workinghours',
            name='time_to',
            field=models.IntegerField(blank=True, null=True, verbose_name='Время окончания работы (если 24 часа, то значение поля - 2400)'),
        ),
    ]
