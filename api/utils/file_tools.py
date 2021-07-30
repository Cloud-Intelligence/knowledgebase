# import pathlib

from db import create_connection


def _nested_set(dic, keys, value):
    pk = ""
    for key in keys[:-1]:
        dic = dic.setdefault(key, dic.get(pk, {}))
        pk = key

    name = keys[-1].replace(".md", "")
    dic[name] = value


def file_list(user):
    DB = create_connection()
    cursor = DB.folders.find({})
    return list(cursor)


def save_file(contents):
    DB = create_connection()
    print(contents)
    res = DB.folders.insert({**contents})
    return res


    # directory = pathlib.Path.cwd() / "data"
    # ret = {}
    # for path in sorted(directory.rglob("*.md")):
    #     path_array = list(path.relative_to(directory).parts)
    #     url = "/md/" + "/".join(path_array)
    #     _nested_set(ret, path_array, url)
    #
    # return dumps(ret)

from bson.objectid import ObjectId

def load_file(file_id):
    DB = create_connection()
    cursor = DB.folders.find_one({"_id": ObjectId(file_id)})
    print(cursor)
    return cursor
