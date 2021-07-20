import pathlib
from ujson import dumps


def _nested_set(dic, keys, value):
    pk = ""
    for key in keys[:-1]:
        dic = dic.setdefault(key, dic.get(pk, {}))
        pk = key

    name = keys[-1].replace(".md", "")
    dic[name] = value


def file_list():
    directory = pathlib.Path.cwd() / "data"
    ret = {}
    for path in sorted(directory.rglob("*.md")):
        path_array = list(path.relative_to(directory).parts)
        url = "/md/" + "/".join(path_array)
        _nested_set(ret, path_array, url)

    return dumps(ret)


def load_file(filepath):
    with open(f"data/{filepath}", "r") as f:
        return f.read()
