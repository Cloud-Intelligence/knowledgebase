from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS
from werkzeug.wrappers import response
from loguru import logger

from authentication import AuthError, requires_auth, requires_scope, get_token_auth_header
from utils.file_tools import file_list, load_file, save_file

APP = Flask(__name__)
CORS(APP)


@APP.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


@APP.route("/api/health")
@cross_origin(headers=["Content-Type", "Authorization"])
def public():
    response = "Healthy"
    return jsonify(message=response)


@APP.route('/api/documents/', methods=['GET', 'POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def index():
    if request.method == "POST":
        save_file("test", "test", '')
        return jsonify(success=True)
    else:
        files = file_list(request.current_user)
        return jsonify(data=files)


@APP.route("/api/documents/<uuid:id>")
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

if __name__ == '__main__':
    APP.run(debug=True, host='0.0.0.0')
