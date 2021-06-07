release: python3 manage.py makemigrations apis && python3 manage.py migrate && python manage.py collectstatic --noinput
web: gunicorn backend.wsgi --log-file - 
