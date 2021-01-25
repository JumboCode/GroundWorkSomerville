release: python manage.py migrate && python manage.py collectstatic --noinput
web: gunicorn backend.wsgi --log-file - 
