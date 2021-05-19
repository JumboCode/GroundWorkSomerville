from django.test import TestCase
from apis.models import StockedVegetable, Vegetable, VegetablePrice
import json


class VegetableTestCase(TestCase):
    def setUp(self):
        id = Vegetable.objects.create(name="brinjal", unit="lbs", categories=2)
        VegetablePrice.objects.create(vegetable=id, price=10.42)
        StockedVegetable.objects.create(vegetable=id, weight=15.4, quantity=4)

    def test_vegetables(self):
        response = self.client.get('/all-produce')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        stored_data = data[1]['produces']
        self.assertEqual(len(stored_data), 1)
        id2 = Vegetable.objects.create(name="potato", unit="lbs", categories=2)
        VegetablePrice.objects.create(vegetable=id2, price=9.42)
        StockedVegetable.objects.create(vegetable=id2, weight=13.4, quantity=3)
        response = self.client.get('/all-produce')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        stored_data = data[1]['produces']
        self.assertEqual(len(stored_data), 2)

    def test_vegetables2(self):
        response = self.client.get('/all-produce')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        stored_data = data[1]['produces']
        self.assertEqual(len(stored_data), 1)

    def tearDown(self) -> None:
        return super().tearDown()
