### Base64 Decrpytion

```python
@app.route('/auth', methods=['POST'])
def authentication():
  auth_header = request.headers.get('Authorization')
  credentials_b64_bytes = base64.b64decode(auth_header.split(' ')[1])   # decode base64, output is type bytes
  credentials = credentials_b64_bytes.decode('utf-8')                   # convert bytes to string
  username = credentials.split(':')[0]
  password = credentials.split(':')[1]

```
