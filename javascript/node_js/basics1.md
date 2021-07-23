## Node.js:
A Javascript runtime built on Chrome's V8 JavaScript engine. Comes with runtime environment on which Javascript can be executed on any machine outside of a browser i.e. on a server. 

Node.js = Runtime environment + Javascript library

Has non-blocking I/O model that is single threaded. Capable of handling a huge number of simultaneous connections with high
throughput which equates to high scalability. Used to build powerful, fast and scalable web applications:
- REST APIs and backend applications.
- Real-time services.
- Blogs, CMS, Social Applications.
- Utilities and tools.
- Anything that is not CPU-intensive.


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
### Application Example:
```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
