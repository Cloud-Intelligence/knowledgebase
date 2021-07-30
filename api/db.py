from pymongo import MongoClient
import ujson as json


def create_connection():
    client = MongoClient("db:27017")
    return client.admin


def drop():
    client = MongoClient("db:27017")
    return client.admin.folders.drop()
