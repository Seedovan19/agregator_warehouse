# Generated by Django 4.0.3 on 2022-04-21 00:46

import agregator.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0012_alter_warehouse_images'),
    ]

    operations = [
        migrations.CreateModel(
            name='WarehouseImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('images', models.FileField(null=True, upload_to=agregator.models.upload_path)),
            ],
            options={
                'verbose_name': 'Фото склада',
                'verbose_name_plural': 'Фото склада',
            },
        ),
        migrations.RemoveField(
            model_name='warehouse',
            name='images',
        ),
        migrations.AddField(
            model_name='warehouse',
            name='image',
            field=models.FileField(blank=True, upload_to=''),
        ),
        migrations.DeleteModel(
            name='Images',
        ),
        migrations.AddField(
            model_name='warehouseimages',
            name='post',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='agregator.warehouse'),
        ),
    ]
