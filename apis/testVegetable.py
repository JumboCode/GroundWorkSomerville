from django.test import TestCase
from apis.models import StockedVegetable, Vegetable, VegetablePrice
import json
'''
apis to test:

add produce
add harvest

update harvest
update produce

all-produce
produce-inventory
produce-detail
'''


class VegetableTestCase(TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def test_vegetables(self):
        response = self.client.get('/all-produce')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        stored_data = data[1]['produces']
        self.assertEqual(len(stored_data), 1)

    def tearDown(self) -> None:
        return super().tearDown()


class AddVegetableTestCase(TestCase):
    def setUp(self):
        id = Vegetable.objects.create(name="brinjal", unit="lbs", categories=2)
        VegetablePrice.objects.create(vegetable=id, price=10.42)
        StockedVegetable.objects.create(vegetable=id, weight=15.4, quantity=4)

    def test_add_harvest(self):
        response = self.client.get('/add-harvest')

    def test_add_produce(self):
        response = self.client.get('/add-produce')

    def tearDown(self) -> None:
        return super().tearDown()


class UpdateVegetableTestCase(TestCase):
    def setUp(self):
        id = Vegetable.objects.create(name="brinjal", unit="lbs", categories=2)
        VegetablePrice.objects.create(vegetable=id, price=10.42)
        StockedVegetable.objects.create(vegetable=id, weight=15.4, quantity=4)

    def test_update_harvest(self):
        response = self.client.get('/add-harvest')


    def test_update_produce(self):
        response = self.client.get('/add-produce')

    def tearDown(self) -> None:
        return super().tearDown()