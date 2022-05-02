### CORS

Cross-Origin Resource Sharing. A protocol that enables scripts running on browser client to interact with resources from a different origin such as different domain, scheme or port. Same-origin policy can be very restrictive as many websites interact with sub-domains or third-party sites.

However, provides potential for cross-domain based attacks such as cross-site request forgery (CSRF).

```
// CORS headers in response
Access-Control-Allow-Origin: https://example.com or *       // full domain requires client to pass authentication headers
Access-Control-Allow-Credentials: true                      // if server supports authentication via cookies
Access-Control-Allow-Headers: x-authentication-token
Access-Control-Allow-Methods: GET, POST

//CORS headers in request
Origin: https://example.com     // client domain with scheme, host and port, unable to overwrite
Access-Control-Request-Method: <method>
Access-Control-Request-Headers: <header 1>, <header 2>

// request
GET /sensitive-victim-data HTTP/1.1
Host: vulnerable-website.com
Origin: https://malicious-website.com
Cookie: sessionid=...

// response
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://malicious-website.com
Access-Control-Allow-Credentials: true
```

### Preflight Requests (Complex HTTP Calls)

If web app needs to make a complex HTTP request, the browser adds a preflight request to the front of request chain. Creates OPTIONS request. Preflight request is automatically issued by browser.
CORS specification defines complex request as:

- Uses other methods than GET, POST or HEAD.
- Includes headers other than Accept, Accept-Language or Content-Language.
- Has Content-Type header other than application/x-www-form-urlencoded, multipart/form-data or text/plain.

OPTIONS request requires three headers:

1. Access-Control-Request-Method
2. Access-Control-Request-Headers
3. Origin

```
// check if server supports request method
curl -X OPTIONS https://example.org -i
```

```
// request
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST                               // tells server request will have POST method
Access-Control-Request-Headers: X-PINGOTHER, Content-Type         // tells server request will have these headers


// response
HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Allow: POST, OPTIONS                                              // *MUST RESPONSE WITH THIS*
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

### Workflow

1. Browser sends OPTIONS request to server (preflight request).
2. Server checks if it allows OPTIONS request (response headers must include Allow: POST, OPTIONS).
3. If accepted, browser then sends original POST/PUT/DELETE/GET requests.

### Why Postman Does Not Throw Error

- CORS standard is implemented by browser which prevents call from completing and generates error message.
- Postman does not implement CORS restrictions as CORS defines restrictions relative to origin of page which initiates the request.
- Postman does not originate from a page with an URL.
