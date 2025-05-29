FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

COPY server/requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "config.wsgi", "--bind", "0.0.0.0:8000"]
