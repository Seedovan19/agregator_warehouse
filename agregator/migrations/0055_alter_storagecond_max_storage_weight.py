# Generated by Django 4.0.3 on 2022-06-13 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0054_surveyresults_leveling_platform_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storagecond',
            name='max_storage_weight',
            field=models.IntegerField(default=1000),
        ),
    ]
