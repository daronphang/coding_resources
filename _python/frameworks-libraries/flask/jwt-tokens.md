## JWT Web Token

JSON Web Token is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information
between parties as a JSON object. Can be verified with digital signature using a secret key (HMAC algorithm) or public/private key (RSA/ECDSA).

JWT are useful for the following:

1. Authorization: protected RESTful API routes can be authenticated with JWT tokens for each subsequent request after the user is logged in.
2. Information Exchange: transmitting information between parties securely.

### JWT Structure

1. Header: consists of token type and signing algorithm.
2. Payload: claims about the user, three types of claims including Registered/Public/Private.
3. Signature: takes the encoded header and payload and signed using the secret key.

### Payload Parameters

```
iss     Issuer of token
sub     Subject of token
aud     Audience of token
exp     Defines expiration in NumericDate value, must be after current date/time
nbf     Defines time before which JWT must not be accepted before processing
iat     Time the JWT was issued
jti     Unique identifier for JWT

All names in structure are three characters long as JWT is meant to be compact.
```

### Creating JWT Token

```python
import jwt

def jwt_token(username):
    header = {
        "alg": "HS256",
        "typ": "JWT"
    }

    payload = {
        "iss": "Micron",
        "jti": username
    }

    jwt_token = jwt.encode(payload=payload, key='JWT_SECRET_KEY', algorithm=' HS256', headers=header)
    return jsonify({'token' : jwt_token.decode('UTF-8')})

# Output is three Base64-URL strings separated by dots i.e. xxxxx.yyyyy.zzzzzzz
```

### Authenticating JWT Token

```python
import datetime
from functools import wraps
from flask import request, jsonify, url_for
import jwt
from flask_toy_project.app_api.config_api import Config
# model import User


def auth_token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization').split(' ')[1]
        if not token:
            return jsonify({'message': 'token not found in authentication header'}), 401

        try:
            payload = jwt.decode(jwt=token, key=Config.JWT_SECRET_KEY, algorithms='HS256')
            token_payload = {'sub': payload['sub'],
                             'iat': datetime.datetime.fromtimestamp(float(payload['iat'])),
                             'exp': datetime.datetime.fromtimestamp(float(payload['exp']))
                             }
            # current_user = User.query.filter_By(user_id=payload['sub']).first()   additional functionality
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'token has expired. Please log in again'}), 401, \
                   {'Location': url_for('api.login')}
        except jwt.InvalidTokenError:
            return jsonify({'message': 'token is invalid. Please try again'}), 401

        return f(token_payload, *args, **kwargs)
    return decorated_function

```

### Unittest for JWT Token

```python
class FlaskClientTestCase(unittest.TestCase):
    @staticmethod
    def get_api_headers(secret_key, expiry):
        header = {
            'alg': 'HS256',
            'typ': 'JWT'
        }
        payload = {
            'iss': 'Micron',
            'sub': 'test',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=expiry),
            'iat': datetime.datetime.utcnow()
        }
        jwt_token = jwt.encode(payload=payload, key=secret_key, algorithm='HS256', headers=header)
        return {
            'Authorization': 'Bearer ' + jwt_token.decode('utf-8'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    @staticmethod
    def verify_token(token, secret_key):
        try:
            payload = jwt.decode(jwt=token, key=secret_key, algorithms='HS256')
            if payload['sub']:
                return {'message': 'success'}
        except jwt.ExpiredSignatureError:
            return {'message': 'expired'}
        except jwt.InvalidTokenError:
            return {'message': 'invalid'}

    def test_expired_token(self):
        create_token = FlaskClientTestCase.get_api_headers(Config.JWT_SECRET_KEY, -60)
        token_value = create_token['Authorization'].split(' ')[1]
        response = FlaskClientTestCase.verify_token(token_value, Config.JWT_SECRET_KEY)
        self.assertEqual(response['message'], 'expired')

    def test_invalid_token(self):
        create_token = FlaskClientTestCase.get_api_headers('NICE_TRY', 60)
        response = self.client.get('/api/v1/search', headers=create_token,
                                   data=json.dumps({'lot_id': '1245581.007'}))
        self.assertEqual(response.status_code, 401)
```
