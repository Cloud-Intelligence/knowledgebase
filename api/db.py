from os import getenv

from pymongo import MongoClient

MANGO_URL = getenv("DB_URL")


def create_connection():
    client = MongoClient(MANGO_URL)
    return client.wiki


def drop():
    client = MongoClient(MANGO_URL)
    return client.wiki.folders.drop()
