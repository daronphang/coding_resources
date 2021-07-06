## How Web API Works:
```
Client:   https://restcountries.eu/rest/v2
          protocol  domain name     resource
```
1) Browser makes request to Domain Name Server (DNS).
2) DNS matches the domain name to server's IP address.
3) Browser establishes TCP/IP (protocols) socket connection with server.
4) HTTP request is made to the server through GET/POST/PUT/DELETE.
5) Two requests are made; first (of type OPTIONS) is to check if the server accepts request source, and the other is the request body.
6) HTTP response sent back from server to browser.

```
// Request
GET /rest/v2  HTTP/1.1
Host: www.google.com
User-Agent: Mozilla/5.0
Accept-Language: en-US
<BODY>

// Response
HTTP/1.1 200 OK
Date: 20 May 2021
Content-Type: text/html
<BODY>
```
