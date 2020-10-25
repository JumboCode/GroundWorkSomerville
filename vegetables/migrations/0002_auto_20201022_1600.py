# Generated by Django 3.1.2 on 2020-10-22 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vegetables', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vegetable',
            name='availability',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='vegetable',
            name='photo',
            field=models.ImageField(default="{%static 'vegetables/default.jpg%}", upload_to='images'),
        ),
    ]