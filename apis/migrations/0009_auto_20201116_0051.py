# Generated by Django 3.1.2 on 2020-11-16 00:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0008_auto_20201116_0046'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Transactions',
            new_name='Transaction',
        ),
    ]