# JWT Web Token:
JSON Web Token is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information 
between parties as a JSON object. Can be verified with digital signature using a secret key (HMAC algorithm) or public/private key (RSA/ECDSA).

JWT are useful for the following:
1) Authorization: protected RESTful API routes can be authenticated with JWT tokens for each subsequent request after the user is logged in.
2) Information Exchange: transmitting information between parties securely.

## JWT Structure:
1) Header: consists of token type and signing algorithm.
2) Payload: claims about the user, three types of claims including Registered/Public/Private.
3) Signature: takes the encoded header and payload and signed using the secret key. 

### Payload Parameters:
- iss: Issuer of token
- sub: Subject of token
- aud: Audience of token
- exp: Defines expiration in NumericDate value, must be after current date/time
- nbf: Defines time before which JWT must not be accepted before processing
- iat: Time the JWT was issued
- jti: Unique identifier for JWT

All names in structure are three characters long as JWT is meant to be compact.

## JWT Example:
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
