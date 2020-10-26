from rest_framework.test import APITestCase
from rest_framework import status

class GetApiTestCase(APITestCase):

  def testApiList(self):
    response = self.client.get('')
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class egetablesTest(APITestCase):

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