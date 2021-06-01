FROM python:3.8-buster
ENV PYTHONUNBUFFERED=1

RUN apt-get update -y

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

ENTRYPOINT [ "python3" ]