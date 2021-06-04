## AJAX:
Asynchronous Javascript and XML. Used to pass client-side request to server-side. Can either use XMLHTTPRequest or fetch method.

```javascript
// XMLHTTPRequest method
const countriesContainer = document.querySelector('.countries');

const request = new XMLHttpRequest();
request.open("GET", 'http://restcountries.eu/singapore');      // does not open connection but configures the request only
request.send();

// registering a callback function on request object on load event once request is completed
request.addEventListener('load', function() {       
    const [data] = JSON.parse(this.responseText);
    const html = 
    `<article class="country">
    <img class="country_img" src="${data.country}"/>
    ...
    </div>
    </article>`

    countriesContainer.insertAdjacentHTML('beforenend', html);
    countriesContainer.style.opacity = 1;
});

// onreadystatechange is an event handler that defines a function to be called when its property changes
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready
       document.getElementById("demo").innerHTML = request.responseText;
    }
};


// fetch method
const getCountry = function(country) {
    fetch('https://example.com/task')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
};
```

## Fetch vs XMLHTTPRequest:
- Fetch uses  Promises and avoids callback hell.
- HTTP errors such as 404 or 500 does not cause Fetch Promise to reject and hence, .catch() is never run. Rejection only occurs if a request cannot be completed.
- Fetch won't send cookies unless credentials init option is set.
- Fetch can perform no-CORS requests.

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
```
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type

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


