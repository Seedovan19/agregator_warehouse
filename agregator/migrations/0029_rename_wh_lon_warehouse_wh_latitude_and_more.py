# Generated by Django 4.0.3 on 2022-06-03 15:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0028_alter_logistics_parking_cost'),
    ]

    operations = [
        migrations.RenameField(
            model_name='warehouse',
            old_name='wh_lon',
            new_name='wh_latitude',
        ),
        migrations.RenameField(
            model_name='warehouse',
            old_name='wh_lat',
            new_name='wh_longitude',
        ),
    ]
