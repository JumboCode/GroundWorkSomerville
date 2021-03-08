# Generated by Django 3.1.6 on 2021-03-08 00:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Harvest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('farm_name', models.CharField(max_length=20)),
                ('created_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Merchandise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('photo', models.ImageField(default='images/default.jpg', upload_to='images')),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=10)),
                ('categories', multiselectfield.db.fields.MultiSelectField(choices=[(1, 'APPAREL'), (2, 'STICKERS'), (3, 'OTHERS')], default=1, max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Vegetable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('photo', models.ImageField(default='images/default.jpg', upload_to='images')),
                ('unit', models.CharField(max_length=100)),
                ('categories', multiselectfield.db.fields.MultiSelectField(choices=[(1, 'FRUIT'), (2, 'VEGETABLE'), (3, 'HERBS'), (4, 'OTHERS')], default=1, max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='VegetablePrice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('updated_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('vegetable', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='apis.vegetable')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('loggedInOnce', models.BooleanField(default=False)),
                ('isGSAdmin', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_complete', models.BooleanField(default=False)),
                ('is_paid', models.BooleanField(default=False)),
                ('method_of_payment', models.CharField(max_length=100)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StockedVegetable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.IntegerField()),
                ('harvested_on', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='apis.harvest')),
                ('vegetable', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='apis.vegetable')),
            ],
        ),
        migrations.CreateModel(
            name='PurchasedItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('categories', multiselectfield.db.fields.MultiSelectField(choices=[(1, 'MERCHANDISE'), (2, 'VEGETABLE')], default=1, max_length=3)),
                ('merchandise', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='apis.merchandise')),
                ('stocked_vegetable', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='apis.stockedvegetable')),
                ('transaction', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='apis.transaction')),
            ],
        ),
        migrations.CreateModel(
            name='MerchandisePrice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('updated_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('merchandise', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='apis.merchandise')),
            ],
        ),
        migrations.AddConstraint(
            model_name='purchaseditem',
            constraint=models.CheckConstraint(check=models.Q(models.Q(('categories', 1), ('merchandise__isnull', True), ('stocked_vegetable__isnull', False)), models.Q(('categories', 2), ('merchandise_isnull', False), ('stocked_vegetable__isnull', True)), _connector='OR'), name='purchased item can be either vegeetable or merchandise'),
        ),
    ]
