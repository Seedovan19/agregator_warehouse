# Generated by Django 4.0.3 on 2022-04-08 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0005_warehouse_long_term_commitment'),
    ]

    operations = [
        migrations.AddField(
            model_name='warehouse',
            name='warehouse_variant',
            field=models.CharField(choices=[('No value', 'Не задано'), ('Sharing', 'Склад от компании'), ('3pl', '3pl-оператор'), ('Storage_only_wh', 'Склад ответственного хранения')], default='No value', max_length=100),
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='warehouse_class',
            field=models.CharField(choices=[('No value', 'Не задано'), ('A+', 'A+'), ('A', 'A'), ('B', 'B'), ('B+', 'B+'), ('C', 'C')], default='No value', max_length=100),
        ),
    ]
