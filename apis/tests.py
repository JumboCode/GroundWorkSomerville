from rest_framework.test import APITestCase
from rest_framework import status
from .models import Vegetable

class GetApiTestCase(APITestCase):
  def testApiList(self):
    response = self.client.get('')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

# TODO: ideally we want to check the fields are actually being updated
class VegetablesTest(APITestCase):
  def testVegetableList(self):
    response = self.client.get('/list-vegetables')
    print(response)
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def testCreateVegetable(self):
    data = {'name': 'pumpkin', 'price': 5, 'availability': True }
    response = self.client.post('/create-vegetable', data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def testDeleteVegetable(self):
    # create a vegetable to delete
    data = {'name': 'pumpkin', 'price': 5, 'availability': True }
    self.client.post('/create-vegetable', data)

    # test delete
    response = self.client.delete('/delete-vegetable/1')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

# TODO: not working
  # def testUpdateVegetable(self):
  #   # create a vegetable to delete
  #   data = {'name': 'pumpkin', 'price': 5, 'availability': True }
  #   self.client.post('/create-vegetable', data)
  #   print(Vegetable.objects.all().values_list('id', flat=True))
  #   # test update
  #   newdata = {'name': 'pumpkin', 'price': 3, 'availability': True }
  #   response = self.client.put('update-vegetable/1', newdata)
  #   self.assertEqual(response.status_code, status.HTTP_200_OK)

  #   # delete
  #   self.client.delete('/delete-vegetable/1')

class HarvestTest(APITestCase):
  def testListHarvests(self):
    response = self.client.get('/list-harvests')
    print(response)
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def testCreateHarvest(self):
    data = {'farm_name': 'gothic acres', 'availability': True}
    response = self.client.post('/create-harvest', data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def testDeleteHarvest(self):
    # create a harvest
    data = {'farm_name': 'gothic acres', 'availability': True}
    self.client.post('/create-harvest', data)

    # and then delete the harvest
    response = self.client.delete('/delete-harvest/1')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
