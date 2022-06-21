## NodeJS

A Javascript runtime environment built on Chrome's V8 JavaScript engine that can be executed on any machine outside of a browser i.e. on a server. V8 engine takes JS code and compiles to machine code. Node JS adds useful features to JS engine such as opening/reading/deleting files which were not possible in browser. DOM API is not a core part of Node.js runtime.

Node.js = Runtime environment + Javascript library

In web development, Node.js is used to run server by creating it and listening to incoming requests, handling business logic (equests, validating input, authentication, database connection), and returning responses rendered in HTML, JSON, XML, etc.

Has non-blocking I/O model that is single threaded. Capable of handling a huge number of simultaneous connections with high
throughput which equates to high scalability. Used to build powerful, fast and scalable web applications:

-   REST APIs and backend applications.
-   Real-time services.
-   Blogs, CMS, Social Applications.
-   Utilities and tools.
-   Anything that is not CPU-intensive.

### Lifecycle

1. Node.js starts script.
2. Parses code and register variables and functions.
3. Creates event loop that keeps on running as long as there are event listeners registered (always available).

Event loop handles event and other callback functions that contain fast finishing code. Other operations including file system are sent to a worker pool that is spun up and amanged by node.js. Responsible for heavy lifting that is detached from js code and runs on different threads. When worker pool is done, it triggers a callback that is handled by event loop.

### Event Loop

Node.js rns non-blocking JS code and uses event-driven code (event loop) for running logic:

1. Registers timers including setTimeout, setInterval callbacks.
2. Checks for any pending callbacks and execute I/O-related that were deferred.
3. Enters poll phase that will look for new I/O events and execute their callbacks, else defers them.
4. Checks for setImmediate() callbacks.
5. Registers any 'close' event callbacks.
6. Exits if there are no remaining event handlers registered (process.exit) where counter ref == 0.

Can use module.exports for registering global objects.
At poll phase, event loop will check again for any timers and can jump back to execute them if exists (doesn't finish iteration).

```javascript
module.exports = {
  handler: requestHandler;
  someText: 'hello world'
}

const routes = require('./routes');

console.log(routes.someText);
const server = http.createServer(routes.handler);
```

### File System Functionality

```javascript
const fs = require("fs"); // node core module

fs.writeFileSync("hello.txt", "hello world"); // writes file to hard drive
```

### Routing Requests

Similar concept with render_template in Flask. Defined in action.

```javascript
res.write("<html>");
res.write("<head><title>Hello</title></head>");
res.write('<body><form action="/message" method="POST"><input type="text" name="message"</form></body>');
res.write("</html>");
return res.end();
```

### Parsing Request Payload (Streams and Buffers)

Request data is read by node.js in chunks i.e. body A, body B, body C. Hence, incoming requests will be rendered in streams and buffers. Useful when working with files as don't have to wait for file to be fully parsed before doing something about it. Buffer is used to organize individual chunks of data (not possible work with indvidual chunks).

### Blocking and Non-Blocking

Sync stands for synchronous. Register a callback function as third argument that will execute when it completes.

### Example

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function rqListener(req, res) {
  console.log(req.headers, req.url, req,method);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const url = req.url;

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk)= > {
      body.push(chunk);
    });

    req.on('end' () => {
      const parsedBody = Buffer.concat(body).toString();    // parsing request bodies
      console.log(parsedBody)   // message=hello world
      const message = parsedBody.split('=')[1]

      // fs.writeFileSync('message.txt', message);    this is synchronous and hence, code blocking
      fs.writeFile('message.txt', message, (err) => {   // third arg is callback function that executes when it is done
        res.statusCode = 302;
        res.setHeader('Location', '/')'
        return res.end();
      });
    });
  }

  res.write('<html>');
  res.write('<head><title>Hello</title></head>');
  res.write('<body>hi</body>');
  res.write('</html>');
  res.end();  // node.js will send response back to client

  process.exit();   // quits process
}

const server = http.createServer(rqListener) // takes request listener as arg that will execute for every incoming request

// keeps on listening for requests, doesn't finish executing script
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### NPM

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
