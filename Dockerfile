FROM python:3.9-buster
ENV PYTHONUNBUFFERED=1

RUN apt-get update -y

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY ./api/main.py /app/main.py
COPY ./data /app/data

ENTRYPOINT [ "python3" ]

CMD [ "main.py" ]
