import pathlib

from bottle import route, run, response, request, HTTPError
from ujson import dumps


def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors


def _nested_set(dic, keys, value):
    pk = ''
    for key in keys[:-1]:
        dic = dic.setdefault(key, dic.get(pk, {}))
        pk = key

    name = keys[-1].replace('.md', '')
    dic[name] = value


@route('/')
@enable_cors
def index():
    directory = pathlib.Path.cwd() / 'data'
    ret = {}
    for path in sorted(directory.rglob('*.md')):
        path_array = list(path.relative_to(directory).parts)
        url = '/md/' + '/'.join(path_array)
        _nested_set(ret, path_array, url)

    response.content_type = 'application/json'
    return dumps(ret)


@route("/md/<filepath:re:.*\.md>")
@enable_cors
def css(filepath):
    response.content_type = 'application/text'
    try:
        with open(f"data/{filepath}", 'r') as f:
            return f.read()
    except FileNotFoundError:
        return HTTPError(404)


run(host='0.0.0.0', port=9001, reloader=True)
