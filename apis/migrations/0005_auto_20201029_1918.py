# Generated by Django 3.1.2 on 2020-10-29 19:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0004_auto_20201029_1912'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Prices',
            new_name='Price',
        ),
    ]