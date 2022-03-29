# Generated by Django 4.0.3 on 2022-03-28 23:14

import agregator.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Features',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('condition', models.CharField(choices=[('No value', 'Не задано'), ('Heated', 'Отапливаемый'), ('Non-heated', 'Неотапливаемый'), ('Warmed', 'Утепленный'), ('Freezer-WH', 'Морозильный'), ('Cold-WH', 'Холодильный')], default='No value', max_length=32)),
                ('freezer', models.BooleanField()),
                ('freezer_size', models.IntegerField(blank=True, default=0, null=True)),
                ('refrigerator', models.BooleanField()),
                ('refrigerator_size', models.IntegerField(blank=True, default=0, null=True)),
                ('alcohol', models.BooleanField()),
                ('pharmacy', models.BooleanField()),
                ('dangerous', models.BooleanField()),
            ],
            options={
                'verbose_name': 'Температурные условия и лицензии',
                'verbose_name_plural': 'Температурные условия и лицензии',
            },
        ),
        migrations.CreateModel(
            name='Logistics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('leveling_platform', models.BooleanField(verbose_name='Оборудование для выравнивания')),
                ('railways', models.BooleanField(verbose_name='Ж/д пути')),
                ('parking', models.BooleanField(verbose_name='Возможность оставить грузовой транспорт на парковке')),
                ('parking_security', models.BooleanField(verbose_name='Охраняемая парковка')),
                ('parking_cost', models.BooleanField(verbose_name='Стоимость парковки')),
                ('comment', models.CharField(blank=True, max_length=100, null=True, verbose_name='Комментарий')),
            ],
            options={
                'verbose_name': 'Логистическое сообщение',
                'verbose_name_plural': 'Логистическое сообщение',
            },
        ),
        migrations.CreateModel(
            name='Security',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('security_post', models.BooleanField()),
                ('all_day_security', models.BooleanField()),
                ('video_control', models.BooleanField()),
                ('magnetic_access_locks', models.BooleanField()),
                ('generator', models.BooleanField()),
                ('alarm_system', models.BooleanField()),
                ('fire_system_type', models.CharField(choices=[('No value', 'Не задано'), ('Alarm', 'Сигнализация'), ('Sprinkler', 'Спринклерная'), ('Powder', 'Порошковая'), ('Gaz', 'Газовая'), ('Hydrant', 'Гидрантная'), ('None', 'Нет')], default='No value', max_length=32)),
            ],
            options={
                'verbose_name': 'Безопасность',
                'verbose_name_plural': 'Безопасность',
            },
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('transport_services', models.BooleanField()),
                ('custom', models.BooleanField()),
                ('crossdock', models.BooleanField()),
                ('palletization', models.BooleanField()),
                ('box_pick', models.BooleanField()),
            ],
            options={
                'verbose_name': 'Услуги',
                'verbose_name_plural': 'Услуги',
            },
        ),
        migrations.CreateModel(
            name='Storagecond',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('floor_storage', models.IntegerField()),
                ('shelf_storage', models.IntegerField()),
                ('max_storage_weight', models.IntegerField()),
                ('max_storage_height', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Условия хранения',
                'verbose_name_plural': 'Условия хранения',
            },
        ),
        migrations.CreateModel(
            name='Workinghours',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('timefrom', models.IntegerField(blank=True, null=True)),
                ('timeto', models.IntegerField(blank=True, null=True)),
                ('teekday', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'График работы',
                'verbose_name_plural': 'График работы',
            },
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to=agregator.models.upload_path)),
                ('square', models.IntegerField()),
                ('adress', models.CharField(max_length=300)),
                ('shelf_storage_cost', models.IntegerField()),
                ('floor_storage_cost', models.IntegerField()),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('warehouse_class', models.CharField(choices=[('No value', 'Не задано'), ('A+', 'A+'), ('A', 'A'), ('B', 'B'), ('B+', 'B+'), ('C', 'C')], default='No value', max_length=100)),
                ('integrated', models.BooleanField()),
                ('wh_lon', models.FloatField(blank=True, null=True)),
                ('wh_lat', models.FloatField(blank=True, null=True)),
                ('time_create', models.DateTimeField(auto_now_add=True)),
                ('time_update', models.DateTimeField(auto_now=True)),
                ('comment', models.CharField(blank=True, max_length=100, null=True)),
                ('features', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agregator.features')),
                ('logistics', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agregator.logistics')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('security', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agregator.security')),
                ('services', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agregator.services')),
                ('storage_conditions', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agregator.storagecond')),
                ('working_hours', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agregator.workinghours')),
            ],
            options={
                'verbose_name': 'Склад',
                'verbose_name_plural': 'Склад',
            },
        ),
    ]
