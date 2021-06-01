import pathlib

from bottle import route, run, response, static_file, HTTPError
from ujson import dumps


@route('/')
def index():
    ret = []
    directory = pathlib.Path.cwd() / 'data'
    for path in sorted(directory.rglob('*.md')):
        url = '/'.join(path.relative_to(directory).parts)
        ret.append('/md/' + url)
    response.content_type = 'application/json'

    return dumps(ret)


@route("/md/<filepath:re:.*\.md>")
def css(filepath):
    response.content_type = 'application/text'
    try:
        with open(f"data/{filepath}", 'r') as f:
            return f.read()
    except FileNotFoundError:
        return HTTPError(404)


run(host='0.0.0.0', port=9001, reloader=True)
