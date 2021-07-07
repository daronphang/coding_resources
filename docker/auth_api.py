import jwt
import os
import json
import base64
from flask_cors import CORS
from functools import wraps
from datetime import datetime
from flask import request, jsonify, Flask
from ldap3 import Server, Connection, ALL
from ldap3.core.exceptions import LDAPExceptionError
# from marshmallow import Schema, fields, ValidationError
# from backend.app.config import Config       # import JWT_SECRET_KEY, PREFIX
# from backend.app.api import api        # import app from blueprint

app = Flask(__name__)
cors = CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

# Configuration Step 1 in config.py:
secret_key = 'secret'
prefix = 'micron'


# Configuration Step 2 in authentication module:
# Not needed as credentials are base64 encrpyted and sent through headers
# class UserSchema(Schema):
#     username = fields.Str(required=True)
#     password = fields.Str(required=True)


def ldap_authentication(username: str, password: str):
    """Takes username and password provided by client from frontend Form and
    sends to LDAP server for authentication. Returns 'success' message if True,
    else 'login failed'.
    """
    ldap_config = dict()
    # define variables
    ldap_config['LDAP_SERVER'] = 'ldap://ldap.imfs.micron.com'
    ldap_config['LDAP_BASE_DN'] = 'ou=mtworkers,o=micron.com'
    # 'dc=na,dc=micron,dc=com'
    LDAP_SEARCH_FILTER = '(uid=' + username.split('@')[0] + ')'
    LDAP_ATTRIBUTES = ['*']
    ldap_msg = None
    ldap_username = None

    # Check if username has @micron.com
    if '@micron.com' in username:
        ldap_username = 'uid=' + username.split('@')[0] + ',' + ldap_config['LDAP_BASE_DN']
    else:
        ldap_username = 'uid=' + username + ',' + ldap_config['LDAP_BASE_DN']

    server = Server(ldap_config['LDAP_SERVER'], get_info=ALL)
    conn = Connection(server, user=ldap_username, password=password)

    try:
        conn.bind()
        result = conn.result
        # Check if username or password is wrong
        if result['result'] == 49 or result['result'] == 32:
            ldap_msg = {
                'message': 'failed',
                'result code': result['result'],
                'description': result['description']
                }

        # Extract impt user info if credentials are correct
        if result['result'] == 0:
            # Retrieving user hierarchy
            conn.search(search_base=ldap_config['LDAP_BASE_DN'],
                        search_filter=LDAP_SEARCH_FILTER,
                        attributes=LDAP_ATTRIBUTES)
            output = conn.entries[0].entry_to_json()
            response = json.loads(output)

            dept = response['attributes']['businessCategory'][0]
            uid = response['attributes']['uid'][0]
            fab = dept.split(' ')[3]
            area = dept.split(' ')[4]

            ldap_msg = {
                'message': result['description'],
                'uid': uid,
                'fab': fab,
                'area': area
                }

    except LDAPExceptionError as e:
        return jsonify({
            'description': e,
            'error': 'LDAP_CONNECTION_FAILURE',
            'status': 404
            }), 404

    else:
        conn.unbind()
    finally:
        return ldap_msg


def generate_auth_token(username: str, password: str):
    """Generates JWT token with expiry if username and password provided are
    verified in LDAP server. Creates unique idenitification for each token
    under 'jti' as PREFIX_username=username_password=password. Function
    extracts username from jti and returns to client.
    """

    # Gives unique identification to token
    jti_var = prefix + '_username=' + username + '_password=' + password
    header = {
        'alg': 'HS256',
        'typ': 'JWT'
    }
    payload = {
        'iss': 'Micron',
        # 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.utcnow(),
        'jti': jti_var
    }
    try:
        jwt_token = jwt.encode(
            payload=payload,
            key=secret_key,
            algorithm='HS256',
            headers=header
            )
        return jwt_token

    except Exception as e:
        return jsonify({
            'error': 'FAILED_GENERATE_TOKEN',
            'description': e,
            'status': 404
        }), 404


def information_required(f):
    """Authentication decorator to be added for every protected route. Client
    provides token in authentication header. Checks if the token provided by
    client is valid and returns necessary data if needed.
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        response_msg = None
        token = request.headers.get('Authorization').split(' ')[1]

        if not token:
            return jsonify({
                'error': 'MISSING_TOKEN',
                'status': 401,
            })

        try:
            token_payload = jwt.decode(
                jwt=token,
                key=secret_key,
                algorithms='HS256')

            # jti in format of prefix_username_password
            # Extracts username and password from jti in token payload
            username = token_payload['jti'].split('_')[1].split('=')[1]
            password = token_payload['jti'].split('_')[2].split('=')[1]

            auto_login = ldap_authentication(username, password)

            if auto_login['message'] == 'failed':
                return jsonify({
                    'error': 'INVALID_CREDENTIALS',
                    'status': 401,
                })

            response_msg = {
                'message': 'VALID_TOKEN',
                'status': 200,
                'description': {'username': username}   # 'exp': datetime.fromtimestamp(float(token_payload['exp']))
                }
            return response_msg

        # except jwt.ExpiredSignatureError:
        #    return jsonify({
        #        'message': 'token has expired. Please log in again'
        #        }), 401,
        # Redirect to login page
        #    {'Location': url_for('http://172.25.245.101/loginpage')}

        except jwt.InvalidTokenError:
            return jsonify({
                'error': 'INVALID_TOKEN',
                'status': 401,
                'description': None     # {'Location': url_for('http://172.25.245.101/loginpage')}
            })

        return f(response_msg, *args, **kwargs)
    return decorated_function


@app.route('/')
def index():
    return {'testing': 'hello world'}


@app.route('/auth', methods=['POST'])
def authentication():
    """Route that checks if username and password is correct. Returns status
    message and token if success back to the client.
    """

    auth_header = request.headers.get('Authorization')
    
    try:
        # credentials = UserSchema().load(json_input)     # returns dict
        credentials_b64_bytes = base64.b64decode(auth_header.split(' ')[1])
        credentials = credentials_b64_bytes.decode('utf-8')
        username = credentials.split(':')[0]
        password = credentials.split(':')[1]

        # Verify user credentials in LDAP server
        ldap_verify = ldap_authentication(username, password)

        if ldap_verify['message'] == 'failed':
            return jsonify({
                'error': 'INVALID_CREDENTIALS',
                'description': ldap_verify['description'],
                'status': 401
                }), 401

        if ldap_verify['message'] == 'success':
            token = generate_auth_token(username, password)
            return jsonify({
                'status': 200,
                'message': 'SUCCESS',
                'uid': ldap_verify['uid'],
                'fab': ldap_verify['fab'],
                'area': ldap_verify['area'],
                'token': token
            }), 200

    except TypeError:
        return jsonify({
            'error': 'INVALID_REQUEST',
            'status': 422,
            'description': 'Missing credentials.'
        }), 422


@app.route('/testing', methods=['GET'])
@information_required
def testing(response_msg, *args, **kwargs):
    return jsonify(response_msg)


if __name__ == '__main__':
    app.run(debug=True)
