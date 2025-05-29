FROM python:3.10-slim

WORKDIR /app

COPY server/requirements.txt /app/server/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /app/server/requirements.txt

COPY . /app

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "config.wsgi", "--bind", "0.0.0.0:8000"]