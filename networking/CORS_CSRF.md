## CORS:
Cross-Origin Resource Sharing. A protocol that enables scripts running on browser client to interact with resources from a different origin such as different domain, scheme
or port. Same-origin policy can be very restrictive as many websites interact with sub-domains or third-party sites.

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
### Preflight Requests for Complex HTTP Calls:
If web app needs to make a complex HTTP request, the browser adds a preflight request to the front of request chain. Creates OPTIONS request.
CORS specification defines complex request as:
- Uses other methods than GET, POST or HEAD.
- Includes headers other than Accept, Accept-Language or Content-Language.
- Has Content-Type header other than application/x-www-form-urlencoded, multipart/form-data or text/plain.

OPTIONS request uses three HTTP request headers:
1) Access-Control-Request-Method
2) Access-Control-Request-Headers
3) Origin

Preflight request is automatically issued by browser.

Workflow:
1. Browser sends OPTIONS request to server (preflight request).
2. Server checks if it allows OPTIONS request.
3. If accepted, browser then sends original POST/PUT/DELETE/GET requests.

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
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

## CSRF Attacks:
Refers to Cross-Site Request Forgery where sessions are abused and trick application users to execute malicious code. Allows an attacker to circumvent the same origin policy. Examples include changing email address, password, making funds transfer, etc. Attack inherits the identity and privileges of victim to perform an undesired function on victim's behalf through the following:
- Authenticated users normally send session cookie with every request; if victim visits/loads attacker's site (similar to original site), they can steal session and perform malicious code to actual website. 
- Victim logins into attacker's site (login CSRF). 

To prevent this, can prevent sessions from using unless users are using expected views i.e. CSRF token. Tokens are generated for every page rendered and sent as a response from backend server. 
