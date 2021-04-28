# Python Curl:
PycURL is a Python interface to libcurl, the multiprotocol file transfer library. A tool for transferring data to and from a server and for making various types of data requests such as testing REST APIs, downloading files, etc. Besides Postman, PycURL is another suitable option that supports protocols including FILE, FTPS, HTTPS, IMAP, POP3, SMTP, SCP, SMB, etc.



## HTTP Protocol:
Can be used to send GET, POST, PUT and DELETE request to a URL.
```python
import requests

requests.get(url)
requests.post(url, data=dict)
requests.put(url, data=dict)
requests.delete(url, data=dict)
```
```python 
# GET request
import pycurl
from io import BytesI0

b_obj = BytesI0()
crl = pycurl.Curl()

crl.setopt(crl.URL, 'https://example.com')
crl.setopt(crl.WRITEDATA, b_obj)    # write bytes that are utf-8 encoded
crl.perform()                       # perform a file transfer
crl.close()
get_body = b_obj.getvalue()         # retrieve content stored in bytes object
print('Output of GET request:\n%s' % get_body.decode('utf-8))
```
```python
# POST request
from urllib.parse import urlencode
import pycurl

crl = pycurl.Curl()
crl.setopt(crl.URL, 'https://www.code-learner.com/post/')
data = {'field': 'value'}
pf = urlencode(data)

# Sets request method to POST,
# Content-Type header to application/x-www-form-urlencoded
# and data to send in request body.
crl.setopt(crl.POSTFIELDS, pf)
crl.perform()
crl.close()
```
```python
# Delete resource of target URL
import pycurl

crl = pycurl.Curl()
crl.setopt(crl.URL, "http://api.example.com/user/148951")
crl.setopt(crl.CUSTOMREQUEST, "DELETE")
crl.perform()
crl.close()
```
