from rest_framework.test import APITestCase
from django.contrib.auth.models import User, Group
from rest_framework import status


class GetApiTestCase(APITestCase):
    def testApiList(self):
        user = User.objects.create_user(username='username')
        user.set_password('Pas$w0rd')
        user.save()
        admin, created = Group.objects.get_or_create(name='admin')
        user.groups.add(admin)
        self.assertTrue(self.client.login(
            username='username', password='Pas$w0rd'))
        response = self.client.get('')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# TODO: ideally we want to check the fields are actually being updated


class VegetablesTest(APITestCase):
    def testVegetableList(self):
        user = User.objects.create_user(username='username')
        user.set_password('Pas$w0rd')
        user.save()
        admin, created = Group.objects.get_or_create(name='admin')
        user.groups.add(admin)
        self.assertTrue(self.client.login(
            username='username', password='Pas$w0rd'))
        response = self.client.get('/list-vegetables')
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testCreateVegetable(self):
        user = User.objects.create_user(username='username')
        user.set_password('Pas$w0rd')
        user.save()
        admin, created = Group.objects.get_or_create(name='admin')
        user.groups.add(admin)
        self.assertTrue(self.client.login(
            username='username', password='Pas$w0rd'))
        data = {'name': 'pumpkin', 'price': 5,
                'availability': True, 'quantity': 'units'}
        response = self.client.post('/create-vegetable', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testDeleteVegetable(self):
        user = User.objects.create_user(username='username')
        user.set_password('Pas$w0rd')
        user.save()
        admin, created = Group.objects.get_or_create(name='admin')
        user.groups.add(admin)
        self.assertTrue(self.client.login(
            username='username', password='Pas$w0rd'))
        # create a vegetable to delete
        data = {'name': 'pumpkin', 'price': 5,
                'availability': True, 'quantity': 'units'}
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
        user = User.objects.create_user(username='username')
        user.set_password('Pas$w0rd')
        user.save()
        admin, created = Group.objects.get_or_create(name='admin')
        user.groups.add(admin)
        self.assertTrue(self.client.login(
            username='username', password='Pas$w0rd'))
        response = self.client.get('/list-harvests')
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testCreateHarvest(self):
        user = User.objects.create_user(username='username')
        user.set_password('Pas$w0rd')
        user.save()
        admin, created = Group.objects.get_or_create(name='admin')
        user.groups.add(admin)
        self.assertTrue(self.client.login(
            username='username', password='Pas$w0rd'))
        data = {'farm_name': 'gothic acres', 'availability': True}
        response = self.client.post('/create-harvest', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testDeleteHarvest(self):
        user = User.objects.create_user(username='username')
        user.set_password('Pas$w0rd')
        user.save()
        admin, created = Group.objects.get_or_create(name='admin')
        user.groups.add(admin)
        self.assertTrue(self.client.login(
            username='username', password='Pas$w0rd'))
        # create a harvest
        data = {'farm_name': 'gothic acres', 'availability': True}
        self.client.post('/create-harvest', data)

        # and then delete the harvest
        response = self.client.delete('/delete-harvest/1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
