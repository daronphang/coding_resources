## Web Servers

Web server is used to store and deliver website content. Refers to both hardware and software. On hardware side, web server is a computer that stores web server software and website's component files such as HTML docs, images, JS and CSS. It connects to the Internet and support physical data interchange with other devices. On software side, a web server includes several parts that control how web users access hosted files, having at least a single HTTP server whhich understands URLs and HTTP protocol.

Web servers are used to serve Web pages requested by clients i.e tool responsible for server-client communication through HTTP protocol. Biggest challenge is to serve many web users requesting different pages written in different programming languages. Web Servers turn files into static HTML and serve them in browser.

### Web-Browser and Web-Server Communication Protocol

1. Client specifies URL in web browser.
2. Web browser makes request to Domain Name Server (DNS) and translates URL to obtain IP address which brings browser to web server.
3. Browser establishes TCP/IP (protocols) socket connection with server.
4. Browser asks for particular file by sending HTTP request.
5. HTTP request is made to the server through GET/POST/PUT/DELETE.
6. Two requests are made; first (of type OPTIONS) is to check if the server accepts request source, and the other is the request body.
7. Web server accepts and responds by sending requested page with HTML file, images, etc. to browser through HTTP.
8. Browser displays webpage.

To publish a website, need either static or dynamic web server. Static web server consists of computer (hardware) and HTTP server (software). Dynamic web server consists of both static web server plus extra software such as an application server and database. Application server is used to update files hosted before they are sent to browser.

### HTTP Servers

- Nginx
- Apache
- Apache Tomcat
- Node.js
- Lighttpd
- Cherokee
- Microsoft IIS
- Appweb
- Hiawatha

### Apache HTTP Server vs Tomcat

Apache HTTP server is a web server designed to server static web pages. Tomcat is an application server built to serve Java applications. Though webpages can still be served through Tomcat, they will be less efficient.
