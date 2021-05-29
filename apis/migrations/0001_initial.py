# Generated by Django 3.1.6 on 2021-05-29 22:16

import apis.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


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
                ('quantity', models.DecimalField(decimal_places=2, max_digits=10)),
                ('categories', models.IntegerField(choices=[(1, 'Apparel'), (2, 'Sticker'), (3, 'Others')])),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='MerchandisePhotos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image1', models.ImageField(default='images/default.jpg', upload_to='images')),
                ('image2', models.ImageField(default='images/default.jpg', upload_to='images')),
                ('image3', models.ImageField(default='images/default.jpg', upload_to='images')),
            ],
        ),
        migrations.CreateModel(
            name='Vegetable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('photo', models.ImageField(default='images/default.jpg', upload_to='images')),
                ('unit', models.CharField(max_length=100)),
                ('categories', models.IntegerField(choices=[(1, 'Fruit'), (2, 'Vegetable'), (3, 'Herb'), (4, 'Others')])),
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
                ('last_paid', models.DateTimeField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receipt_number', models.CharField(default=apis.models.increment_receipt_number, max_length=500, unique=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_picked', models.BooleanField(default=False)),
                ('total_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('is_paid', models.BooleanField(default=False)),
                ('method_of_payment', models.CharField(max_length=100)),
                ('user_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='apis.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='StockedVegetable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.IntegerField()),
                ('harvested_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('vegetable', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='apis.vegetable')),
            ],
        ),
        migrations.CreateModel(
            name='PurchasedItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('categories', models.IntegerField(choices=[(1, 'Vegetable'), (2, 'Merchandise')])),
                ('merchandise', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='apis.merchandise')),
                ('stocked_vegetable', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='apis.stockedvegetable')),
                ('transaction', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='apis.transaction')),
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
        migrations.AddField(
            model_name='merchandise',
            name='photos',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.merchandisephotos'),
        ),
        migrations.AddConstraint(
            model_name='purchaseditem',
            constraint=models.CheckConstraint(check=models.Q(models.Q(('categories', 1), ('merchandise__isnull', True), ('stocked_vegetable__isnull', False)), models.Q(('categories', 2), ('merchandise__isnull', False), ('stocked_vegetable__isnull', True)), _connector='OR'), name='Purchased item can only be either Vegetable or Merchandise'),
        ),
    ]
