# Generated by Django 4.0.3 on 2022-05-22 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0020_rename_teekday_workinghours_weekday'),
    ]

    operations = [
        migrations.CreateModel(
            name='SurveyResults',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_type', models.CharField(max_length=100)),
                ('condition', models.CharField(choices=[('No value', 'Не задано'), ('Regulated', 'Регулируемый температурный режим'), ('Heated', 'Отапливаемый'), ('Warmed', 'Утепленный'), ('Non-heated', 'Неотапливаемый'), ('Freezer-WH', 'Морозильный'), ('Cold-WH', 'Холодильный')], default='No value', max_length=32)),
                ('freezer', models.BooleanField()),
                ('refrigerator', models.BooleanField()),
                ('alcohol', models.BooleanField(default=False)),
                ('pharmacy', models.BooleanField(default=False)),
                ('food', models.BooleanField(default=False)),
                ('dangerous', models.BooleanField(default=False)),
                ('warehouse_class', models.CharField(choices=[('No value', 'Не задано'), ('A+', 'A+'), ('A', 'A'), ('B', 'B'), ('B+', 'B+'), ('C', 'C')], default='No value', max_length=100)),
                ('wh_lon', models.FloatField(blank=True, null=True)),
                ('wh_lat', models.FloatField(blank=True, null=True)),
                ('pallet_storage_capacity', models.IntegerField(default=0, verbose_name='Количество палет')),
                ('transport_services', models.BooleanField()),
                ('box_pick', models.BooleanField()),
                ('custom', models.BooleanField()),
                ('crossdock', models.BooleanField()),
                ('palletization', models.BooleanField()),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('company', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.CharField(blank=True, max_length=100, null=True)),
                ('phone', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'verbose_name': 'Результаты опроса',
                'verbose_name_plural': 'Результаты опроса',
            },
        ),
        migrations.AlterField(
            model_name='storagecond',
            name='pallet_handling_cost',
            field=models.IntegerField(default=0, verbose_name='Стоимость приемки/отгрузки палет (с НДС)'),
        ),
        migrations.AlterField(
            model_name='storagecond',
            name='pallet_storage_capacity',
            field=models.IntegerField(default=0, verbose_name='Вместимость (палет)'),
        ),
        migrations.AlterField(
            model_name='storagecond',
            name='pallet_storage_cost',
            field=models.IntegerField(default=0, verbose_name='Стоимость хранения палет (с НДС)'),
        ),
    ]
