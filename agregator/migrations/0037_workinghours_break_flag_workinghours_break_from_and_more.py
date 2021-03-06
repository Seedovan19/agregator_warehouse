# Generated by Django 4.0.3 on 2022-06-03 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0036_alter_workinghours_time_to'),
    ]

    operations = [
        migrations.AddField(
            model_name='workinghours',
            name='break_flag',
            field=models.BooleanField(default=False, verbose_name='Наличие перерыва'),
        ),
        migrations.AddField(
            model_name='workinghours',
            name='break_from',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='Время начала перерыва'),
        ),
        migrations.AddField(
            model_name='workinghours',
            name='break_to',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='Время окончания перерыва'),
        ),
        migrations.AlterField(
            model_name='workinghours',
            name='time_from',
            field=models.IntegerField(blank=True, null=True, verbose_name='Время начала работы'),
        ),
        migrations.AlterField(
            model_name='workinghours',
            name='time_to',
            field=models.IntegerField(blank=True, null=True, verbose_name='Время окончания работы'),
        ),
        migrations.AlterField(
            model_name='workinghours',
            name='weekday',
            field=models.IntegerField(blank=True, choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday')], default=1, null=True, verbose_name='До какого дня недели'),
        ),
    ]
