## Basics:
A Javascript runtime built on Chrome's V8 JavaScript engine that can be executed on any machine outside of a browser i.e. on a server. V8 engine takes JS code and compiles to machine code. Node JS adds useful features to JS engine such as opening/reading/deleting files which were not possible in browser.

Node.js = Runtime environment + Javascript library

In web development, Node.js is used to run server by creating it and listening to incoming requests, handling business logic (equests, validating input, authentication, database connection), and returning responses rendered in HTML, JSON, XML, etc.

Has non-blocking I/O model that is single threaded. Capable of handling a huge number of simultaneous connections with high
throughput which equates to high scalability. Used to build powerful, fast and scalable web applications:
- REST APIs and backend applications.
- Real-time services.
- Blogs, CMS, Social Applications.
- Utilities and tools.
- Anything that is not CPU-intensive.

## Lifecycle:
1) Node.js starts script.
2) Parses code and register variables and functions.
3) Creates event loop that keeps on running as long as there are event listeners registered (always available).

## File System Functionality:

```javascript
const fs = require('fs');   // node core module 
  
fs.writeFileSync('hello.txt', 'hello world');   // writes file to hard drive
```

## Example:
```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function rqListener(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  console.log(req.headers, req.url, req,method)
  
  process.exit();   // quits process
}

const server = http.createServer(rqListener) // takes request listener as arg that will execute for every incoming request

// keeps on listening for requests, doesn't finish executing script
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### NPM:
Node.js Package Manager used to install node programs/modules.

```
# Popular modules:
Express
Connect
Socket.io
Pug/Jade
Mongo/Mongoose
Coffee-Script
Redis

npm init                      Creates package.json file in root directory of application.
npm install                   Functions similarly to requirements.txt where packages in package.json dependencies will be installed.
npm install express           Installs in current directory
npm install -g express        g stands for globally
npm install -g live-server    Type live-server in terminal to run

node -v                       Check Node.js version
```


