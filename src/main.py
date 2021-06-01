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


@route('/')
@enable_cors
def index():
    ret = []
    directory = pathlib.Path.cwd() / 'data'
    for path in sorted(directory.rglob('*.md')):
        url = '/'.join(path.relative_to(directory).parts)
        ret.append('/md/' + url)
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
