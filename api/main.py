from flask import Flask, jsonify
from flask_cors import cross_origin, CORS
from werkzeug.wrappers import response

from authentication import AuthError, requires_auth, requires_scope
from utils.file_tools import file_list, load_file

APP = Flask(__name__)
CORS(APP)


@APP.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


@APP.route("/api/public")
@cross_origin(headers=["Content-Type", "Authorization"])
def public():
    response = "Public Endpoint"
    return jsonify(message=response)


@APP.route("/api/private")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def private():
    response = "Private endpoint"
    return jsonify(message=response)


@APP.route("/api/private-scoped")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def private_scoped():
    if requires_scope("read:messages"):
        response = "private scoped endpoint"
        return jsonify(message=response)
    raise AuthError(
        {
            "code": "Unauthorized",
            "description": "You don't have access to this resource",
        },
        403,
    )


@APP.route('/')
# @cross_origin(headers=["Content-Type", "Authorization", "Access-Control-Allow-Origin"])
@requires_auth
def index():
    files = file_list()
    response = jsonify(message=files)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@APP.route("/md/<string:filepath>")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def detail(filepath):
    try:
        load_file(filepath)
    except FileNotFoundError:
        raise AuthError({
            "code": "File not found",
            "description": "The file you have requested does not exist"
        }, 404)

    return jsonify(message='TDB')

if __name__ == '__main__':
    APP.run(debug=True, host='0.0.0.0')
