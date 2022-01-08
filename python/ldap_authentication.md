### LDAP Protocol

1. Attribute names and string values must be stored in unicode with UTF-8 byte encoding as interaction with LDAP server is in bytes.
2. Attribute names must use only ASCII letters, numbers and hypen character.

### LDAP Protocol Sequence

1. Client opens connection
2. Client authenticates (bind)
3. Client sends operations (search)
4. Server sends results
5. Client unbinds and closes connection

### Bind

Authentication operation that can be performed in three ways:

```
Anonymous Bind          Public access to LDAP server where no credentials are provided
Simple Password Bind    Provide Distinguished Name (DN) and password to determine authorization level
SASL                    Provides additional methods to identify a user i.e. external certificate, Kerberos ticket
```

### Client Strategy

Parameter of Connection object.

```
# Synchronous, returns boolean if successful
SYNC
RESTARTABLE

# Asynchronous, returns a number and message_id of request. Can send multiple requests without waiting for responses
ASYNC
REUSABLE

get_response(message_id, timeout)   # Exception raised if response has not arrived after timeout (default is 10s)
```

```python
import ldap

def check_credentials(username, password):
    LDAP_SERVER = 'ldap://our-ldap.server'
    LDAP_USERNAME = username
    LDAP_PASSWORD = password
    base_dn = 'dc=somedomain,dc=com'                            # domain
    ldap_filter = 'userPrincipalName=user@somedomain.com'
    ldap_attr = ['memberOf'] or ['*']                           # attributes to receive

    try:
        conn = ldap.initialize(LDAP_SERVER)
        conn.set_option(ldap.OPT_REFERRALS, 0)    # perform sychronous bind
        conn.simple_bind_s(LDAP_USERNAME, LDAP_PASSWORD)  # _s means request will be executed sychronously
    except ldap.INVALID_CREDENTIALS:
        conn.unbind()
        return 'Wrong username or password'
    except ldap.SERVER_DOWN:
        return 'AD server not available'

    result = connect.search_s(base_dn,
                          ldap.SCOPE_SUBTREE,   # search object and all its descendants
                          ldap_filter,
                          ldap_attr)
    conn.unbind()

# result is a tuple
# [(‘CN=user,OU=user_orgunit,OU=Users,OU=City,DC=somedomain,DC=com’, {‘memberOf’: [‘group1’, ‘group2’]})]
```

```python
from ldap3 import Server, Connection, ALL
from ldap3.core.exceptions import LDAPExceptionError


def ldap_authentication(username: str, password: str):
    """Takes username and password provided by client from frontend Form and
    sends to LDAP server for authentication. Returns 'success' message if True,
    else 'failed'.
    """

    ldap_config = dict()

    ldap_config['LDAP_SERVER'] = 'ldap://test.micron.com'
    ldap_config['LDAP_BASE_DN'] = 'ou=mtworkers,o=micron.com'       # 'ou=mtworkers,o=micron.com'  'dc=na,dc=micron,dc=com'
    LDAP_ATTRIBUTES = ['*']
    LDAP_SEARCH_FILTER = '(uid=' + username.split('@')[0] + ')'
    ldap_msg = None
    ldap_username = 'uid=' + username + ',' + ldap_config['LDAP_BASE_DN']

    server = Server(ldap_config['LDAP_SERVER'], get_info=ALL)
    conn = Connection(server, user=ldap_username, password=password)

    try:
        conn.bind()
        result = conn.result

        if result['result'] == 49 or result['result'] == 32:
            ldap_msg = {
                'message': 'login failed',
                'result code': result['result'],
                'description': result['description']
                }

        if result['result'] == 0:
            # Retrieving user hierarchy
            conn.search(search_base=ldap_config['LDAP_BASE_DN'],
                        search_filter=LDAP_SEARCH_FILTER,
                        attributes=LDAP_ATTRIBUTES)
            output = conn.response
            response = output[0]    # response is of type dict

            # for x in response:
            #     print(f'{x}: {response[x]}')
            #     if isinstance(response[x], ldap3.utils.ciDict.CaseInsensitiveDict):
            #         for y in response[x]:
            #             print(f'{y}: {response[x][y]}')
            # print('')

            # Returning necessary info
            ldap_msg = {
                'message': result['description'],
                'uid': response['raw_attributes']['uid'][0].decode('utf-8'),
                'dept': response['raw_attributes']
                ['businessCategory'][0].decode('utf-8')
            }

    except LDAPExceptionError as e:
        ldap_msg = {
            'message': 'connection failure',
            'error': e
        }

    else:
        conn.unbind()
    finally:
        return ldap_msg


# conn = Connection(server, 'uid=admin,cn=users,cn=accounts,dc=demo1,dc=freeipa,dc=org', 'Secret123', auto_bind=True)

>>> print(conn)
# ldap://ipa.demo1.freeipa.org:389 - cleartext - user: None - bound - open - <local: 192.168.1.101:49813 - remote: 209.132.178.99:389> -
# tls not started - listening - SyncStrategy - internal decoder

server.schema     # prints all information about server

# Mandatory search_filter example:
# &, |, !
# Search all users named John or Fred with an email ending with @example.org
(&                        # AND assertion
    (|                    # OR assertion
        (givenName=Fred)
        (givenName=John)
    )
    (mail=*@example.org)
)
```

### Connection object attributes:

```
result          Result of last operation returned by server
response        Entries found if last operation is Search
entries         Entries found exposed by ldap3 Abstraction layer if last operation is Search
last_error      Error if occured in operation
bound           True if connection is bound to server
listening       True if socket is listening to server
closed          True if socket is not open
```

## Template:

```python
import jwt
import os
import json
from flask_cors import CORS
from functools import wraps
from datetime import datetime
from flask import request, jsonify, Flask
from ldap3 import Server, Connection, ALL
from ldap3.core.exceptions import LDAPExceptionError
from marshmallow import Schema, fields, ValidationError
# from backend.app.config import Config       # import JWT_SECRET_KEY, PREFIX
# from backend.app.api import api        # import app from blueprint

app = Flask(__name__)
cors = CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

# Configuration Step 1 in config.py:
secret_key = 'secret'
prefix = 'micron'


# Configuration Step 2 in authentication module:
class UserSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)


def ldap_authentication(username: str, password: str):
    """Takes username and password provided by client from frontend Form and
    sends to LDAP server for authentication. Returns 'success' message if True,
    else 'login failed'.
    """
    ldap_config = dict()
    # define variables
    ldap_config['LDAP_SERVER'] = 'ldap://ldap.micron.com'
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


@app.route('/auth', methods=['POST'])
def authentication():
    """Route that checks if username and password is correct. Returns status
    message and token if success back to the client.
    """
    json_input = request.get_json()

    # Verifying client inputs with deserialization
    try:
        credentials = UserSchema().load(json_input)     # returns dict

        username = credentials['username']
        password = credentials['password']

    except ValidationError as e:
        return jsonify({
            'error': 'INVALID_REQUEST',
            'status': 422,
            'description': e
        }), 422

    else:
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


@app.route('/testing', methods=['POST'])
@information_required
def testing(response_msg, *args, **kwargs):
    return jsonify(response_msg)


if __name__ == '__main__':
    app.run(debug=True)

```
