# Generated by Django 4.0.3 on 2022-06-03 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0045_warehouse_domestic_premises_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='warehouse',
            name='office_premises_square',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='Площадь административно-бытовой зоны (м2)'),
        ),
    ]