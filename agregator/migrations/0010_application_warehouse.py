# Generated by Django 4.0.3 on 2022-04-20 14:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('agregator', '0009_application'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='warehouse',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='agregator.warehouse'),
        ),
    ]