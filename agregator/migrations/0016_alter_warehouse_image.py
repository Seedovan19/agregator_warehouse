# Generated by Django 4.0.3 on 2022-04-21 01:18

import agregator.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0015_rename_post_warehouseimages_warehouse'),
    ]

    operations = [
        migrations.AlterField(
            model_name='warehouse',
            name='image',
            field=models.FileField(blank=True, upload_to=agregator.models.upload_path_for_main_img),
        ),
    ]