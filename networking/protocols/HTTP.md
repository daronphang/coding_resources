## Hypertext Transfer Protocol Secure (HTTP)

HTTP is an application layer protocol for fetching resources such as HTML documents. It is the foundation of any data exchange on the World Wide Web and it is a client-server protocol i.e. requests are initiated by the recipient, usually the web browser. HTTP defines how messages are formatted and transmitted across the web, with instructions for browsers and servers on how to respond to various requests and commands. HTTP is usually through port 443 with unsecured protocol being through port 80.

Clients and servers communicate by exchanging individual messages (as opposed to a stream of data). Each request is sent to a web server, which handles it and provides a response. Between the client and server there are numerous entities called proxies, which perform different operations and acts as gateways or caches.

HTTP utilizes specific request methods such as GET, HEAD, POST, PUT, DELETE, etc.

## Basic Aspects

### HTTP is simple

HTTP is generally designed to be simple and human readable, even with the added complexity introduced in HTTP/2 by encapsulating HTTP messages into frames.

### HTTP is extensible

Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiemnt with. New functionality can even be introduced by a simple agreement between client and server about a new header's semantics.

### HTTP is stateless, but not sessionless

There is no link between two requests sent successively on the same connection. Nonetheless, HTTP cookies allow the use of stateful sessions.

## HTTP Flow

When a client wants to communicate with a server or an intermediate proxy, it performs the following steps:

1. Open a TCP connection (client can open a new connection, reuse an existing connection, or open several TCP connections to servers).
2. Send an HTTP message (HTTP/2 encapsultes messages into frames and hence, impossible to read directly).

```
GET / HTTP/1.1
Host: developer.mozilla.org
Accept-Language: fr
```

3. Read response sent by server.

```
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html

<!DOCTYPE html... (here come the 29769 bytes of the requested web page)
```

4. Close or reuse the connection for further requests.

## Client

Browser is always the entity initiating the request. The procedure for a browser to display a webpage is as follows:

1. Browser translates URL into a request message according to HTTP.
2. Browser sends an original request to fetch the HTML document that represents the page.
3. Parses the file i.e. makes additional requests corresponding to execution scripts, layout information (CSS) to display, and sub-resources contained within the page (usually images and videos).
4. Combines resources to present the complete document.
5. Scripts executed by the browser can fetch additional resources in later phases and browser updates accordingly.

## Web Page

A webpage is a hypertext document i.e. some parts of the displayed content are links which can be acivated.

## Web Server

Serves the document as requested by the client. A server may be collection of servers sharing the load (load balancing), or a complex piece of software interrogating other computers i.e. cache, DB server, or e-commerce servers.

## Proxies

Computers/machines located between web browser and server that relay the HTTP messages. Those operating at Application layers are called Proxies:

-   Transparent: Forwarding on the requests they receive without altering them in any way.
-   Non-Transparent: Change the request in some way before passing it along to the server.

Proxies may perform the following functions:

-   Caching.
-   Filtering.
-   Load balancing.
-   Authentication.
-   Logging.

## Python Curl

PycURL is a Python interface to libcurl, the multiprotocol file transfer library. A tool for transferring data to and from a server and for making various types of data requests such as testing REST APIs, downloading files, etc. Besides Postman, PycURL is another suitable option that supports protocols including FILE, FTPS, HTTPS, IMAP, POP3, SMTP, SCP, SMB, etc.

### HTTP Protocol

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
