# Generated by Django 4.0.3 on 2022-03-30 09:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='warehouse',
            name='features',
        ),
    ]
