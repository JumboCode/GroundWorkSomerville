# Generated by Django 3.1.2 on 2020-10-29 16:00

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vegetable',
            name='price',
        ),
        migrations.AddField(
            model_name='harvest',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='harvest',
            name='created_on',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='harvest',
            name='updated_on',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='vegetable',
            name='availability',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='harvest',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='harvest',
            name='farm_name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='stockedvegetable',
            name='harvested_on',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='apis.harvest'),
        ),
        migrations.CreateModel(
            name='Prices',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('updated_on', models.DateField(default=django.utils.timezone.now)),
                ('veg', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='apis.vegetable')),
            ],
        ),
    ]
