import pathlib
import json
from six.moves.urllib.request import urlopen
from functools import wraps
from flask import Flask, request, jsonify, _request_ctx_stack
from flask_cors import cross_origin
from jose import jwt

AUTH0_DOMAIN = 'dev-2li3-ipg.eu.auth0.com'
API_AUDIENCE = 'https://markdown-viewer/api'
ALGORITHMS = ["RS256"]

APP = Flask(__name__)

# Error handler
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

@APP.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

# Format error response and append status code
def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with"
                            " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be"
                            " Bearer token"}, 401)

    token = parts[1]
    return token

def requires_auth(f):
    """Determines if the Access Token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    "please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
    return decorated

def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("scope"):
            token_scopes = unverified_claims["scope"].split()
            for token_scope in token_scopes:
                if token_scope == required_scope:
                    return True
    return False

def _nested_set(dic, keys, value):
    pk = ''
    for key in keys[:-1]:
        dic = dic.setdefault(key, dic.get(pk, {}))
        pk = key

    name = keys[-1].replace('.md', '')
    dic[name] = value

#requires a jwt token header for access
@APP.route('/')
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def index():
    directory = pathlib.Path.cwd() / 'data'
    ret = {}
    for path in sorted(directory.rglob('*.md')):
        path_array = list(path.relative_to(directory).parts)
        url = '/md/' + '/'.join(path_array)
        _nested_set(ret, path_array, url)

    return jsonify(message=ret)

#requires a jwt header for access
@APP.route("/md/<string:filepath>")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def css(filepath):
    try:
        with open(f"data/{filepath}", 'r') as f:
            return jsonify(message=f.read())
    except FileNotFoundError:
        raise AuthError({
        "code": "File not found",
        "description": "The file you have requested does not exist"
        }, 404)

if __name__ == '__main__':
    APP.run(debug=True, host='0.0.0.0')
