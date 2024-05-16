# FROM tiangolo/uwsgi-nginx-flask:python3.7
FROM python:3.10-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

RUN apt update
RUN yes | apt install vim

COPY ./ /app
WORKDIR /app

ENV STATIC_URL /app/static
ENV STATIC_PATH /var/www/app/static

RUN pip install -r /app/requirements.txt

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app