from rest_framework.response import Response
from rest_framework import status


def user_loggedin(view_func):
	def wrapper_func(request, *args, **kwargs):
		if (request.user.is_authenticated):
			return view_func(request, *args, **kwargs)
		else:
			return Response(status=status.HTTP_403_FORBIDDEN)
  		return wrapper_func


def allowed_users(allowed_roles=[]):
  def decorator(view_func):
    def wrapper_func(request, *args, **kwargs):
      group = None
      if request.user.groups.exists():
        group = request.user.groups.first().name
      
      if group in allowed_roles:
        return view_func(request, *args, **kwargs)
      else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    return wrapper_func
  return decorator 