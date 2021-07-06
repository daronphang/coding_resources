# Web Servers:
Web server is used to store and deliver website content. Refers to both hardware and software. On hardware side, web server is a computer that stores web server software and website's component files such as HTML docs, images, JS and CSS. It connects to the Internet and support physical data interchange with other devices. On software side, a web server includes several parts that control how web users access hosted files, having at least a single HTTP server whhich understands URLs and HTTP protocol. 

Web servers are used to serve Web pages requested by clients i.e tool responsible for server-client communication through HTTP protocol. Biggest challenge is to serve many web users requesting different pages written in different programming languages. Web Servers turn files into static HTML and serve them in browser. 

## Web-Browser and Web-Server Communication Protocol:
1. Client specifies URL in web browser.
2. Web browser makes request to Domain Name Server (DNS) and translates URL to obtain IP address which brings browser to web server.
3. Browser establishes TCP/IP (protocols) socket connection with server.
4. Browser asks for particular file by sending HTTP request.
5. HTTP request is made to the server through GET/POST/PUT/DELETE.
6. Two requests are made; first (of type OPTIONS) is to check if the server accepts request source, and the other is the request body.
7. Web server accepts and responds by sending requested page with HTML file, images, etc. to browser through HTTP.
8. Browser displays webpage.

To publish a website, need either static or dynamic web server. Static web server consists of computer (hardware) and HTTP server (software). Dynamic web server consists of both static web server plus extra software such as an application server and database. Application server is used to update files hosted before they are sent to browser.

Popular web server software include Nginx, Tomcat and Apache.

```
Client:   https://restcountries.eu/rest/v2
          protocol  domain name     resource
```
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

## Apache:
Most commonly used web server on Linux systems.  Apache Web Servers are often used in combination with MySQL database engine, PHP, Python and Perl (configuration is termed LAMP).
