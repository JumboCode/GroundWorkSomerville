from apis.serializers import HarvestSerializer, VegetableSerializer
import base64
import uuid


# @api_view(['GET'])
# def apiOverview(request):
#     apiUrls = {
#         'List all vegetables': '/list-vegetables',
#         'Create': '/create-vegetable',
#         'Update': '/update-vegetable',
#         'Delete': '/delete-vegetable/<str:pk>',
#         'List all harvests': '/list-harvests',
#         'Create harvest': '/create-harvest',
#         'Delete harvest': '/delete-harvest/<str:pk>',
#         'List user transactions': '/list-transactions/<str:pk>',
#         'Create purchase': '/create-purchase',
#         'Add product': '/add-product',
#     }
#     return Response(apiUrls)


def create_harvest(cols):
    harvest_dict = {'farm_name': cols['farm'][0]}
    harvest_serializer = HarvestSerializer(data=harvest_dict)
    if harvest_serializer.is_valid():
        harvest_serializer.save()
    return harvest_serializer


def create_vegetables(cols):
    for vegetable_name in cols['item']:
        vegetable_dict = {'name': vegetable_name}
        serializer = VegetableSerializer(data=vegetable_dict)
        if serializer.is_valid():
            serializer.save()


def validate_harvest_spreadsheet(cols):
    return (('farm' in cols) and ('item' in cols) and ('quantity' in cols)
            and len(cols['farm']) == len(cols['item'])
            and len(cols['item']) == len(cols['quantity'])
            and len(cols['quantity']) != 0)


'''
Decodes a base64 image, creates a unique file name to save it under,
and returns a tuple that consists of (image, file name).
Note that this doesn't create any files. In many scenarios,
there's some kind of data you need to validate before saving the image
(e.g. serializing request data), so it would be a waste to save images
for invalid entries that aren't saved in the database.
'''


def decode_base64_image(image64):
    image_decoded = base64.b64decode(image64)
    file_name = 'public/static/images/' + uuid.uuid4().hex
    return (image_decoded, file_name)
