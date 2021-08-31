from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS
from werkzeug.wrappers import response
from loguru import logger
import ujson as json

from authentication import (
    AuthError,
    requires_auth,
    requires_scope,
    get_token_auth_header,
)
from utils.file_tools import file_list, load_file, save_file, tags, topics

APP = Flask(__name__)
CORS(APP)


@APP.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


@APP.route("/api/health/")
@cross_origin(headers=["Content-Type", "Authorization"])
def public():
    response = "Healthy"
    return jsonify(message=response)


@APP.route("/api/documents/", methods=["GET", "POST"])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def index():
    if request.method == "POST":
        res = save_file(json.loads(request.data))
        return jsonify(success=True, id=str(res))
    else:
        files = file_list(request.current_user)
        files = [
            {
                "id": str(f.pop("_id")),
                "topic": f["topic"],
                "title": f["data"]["title"],
            }
            for f in files
        ]
        return jsonify(data=files)


@APP.route("/api/documents/<string:file_id>/")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def detail(file_id):
    try:
        ret = load_file(file_id)
        del ret["_id"]
        return jsonify(data=ret["data"])
    except FileNotFoundError:
        raise AuthError(
            {
                "code": "File not found",
                "description": "The file you have requested does not exist",
            },
            404,
        )


@APP.route("/api/documents/topics/")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def topic_list():
    ret = topics()
    return jsonify(data=ret)


@APP.route("/api/documents/tags/")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def tag_list():
    ret = tags()
    return jsonify(data=ret)


if __name__ == "__main__":
    APP.run(debug=True, host="0.0.0.0")
