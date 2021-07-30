from bson.objectid import ObjectId
from db import create_connection

DB = create_connection()


def _nested_set(dic, keys, value):
    pk = ""
    for key in keys[:-1]:
        dic = dic.setdefault(key, dic.get(pk, {}))
        pk = key

    name = keys[-1].replace(".md", "")
    dic[name] = value


def file_list(user):
    cursor = DB.folders.find({})
    return list(cursor)


def save_file(contents):
    res = DB.folders.insert({**contents})
    return res


def load_file(file_id):
    cursor = DB.folders.find_one({"_id": ObjectId(file_id)})
    return cursor
