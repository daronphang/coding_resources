# Python Curl:
Curl is a tool for transferring data to and from a server and for making various types of data requests such as testing REST APIs, downloading files, etc.
Besides Postman, PycURL is another suitable option that supports protocols including FILE, FTPS, HTTPS, IMAP, POP3, SMTP, SCP, SMB, etc.

## HTTP Protocol:
Can be used to send GET, POST, PUT and DELETE request to a URL.
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
