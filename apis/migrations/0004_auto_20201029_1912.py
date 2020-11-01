# Generated by Django 3.1.2 on 2020-10-29 19:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0003_auto_20201029_1826'),
    ]

    operations = [
        migrations.AlterField(
            model_name='harvest',
            name='created_on',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='harvest',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='harvest',
            name='updated_on',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='prices',
            name='updated_on',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]