### Basics

Bidirectional channel between Socket.IO server (node.js) and Socker.IO client (browser, node.js, python, etc) is established with WebSocket connection and will use HTTP long-polling as fallback. Consists of Engine.IO and Socket.IO API. Engine.IO is responsible for establishing low-level connection between server and client. As it uses web sockets protocol, it does not interfere with HTTP requests.

Socket.IO is not WebSocket implementation as it adds additional metadata to each packet. Hence, WebSocket client cannot connect to Socket.IO server and vice versa.

```
$npm install --save socket.io
$npm install --save socket.io-client

io.on()         Event handler that handles connection, disconnection, and events using socket object
socket.on()     Handles events sent with socket.send(), socket.emit() or socket.broadcast()
```

```js
// establishing connection from server
const app = require("express")();
const httpServer = require("http").createServer(app);   // need running http server
const options = { /* ... */ };

const io = require("socket.io")(httpServer, options);   // creates socket.io instance built on top of http server

io.on("connection", socket => {
  console.log('client connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.send('hello world');   // send message from server to client

  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
});

httpServer.listen(3000);  // cannot use app.listen() as it creates a new HTTP server


// establishing connection from client
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');    // initialize socket object to establish client connection to server

// handles event sent with socket.emit() from server
socket.on("greetings", (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
```

### Alternative

```js
const server = app.listen(8080);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("client connected");
});
```

### Emitting Events

Both server and client can emit events.

```js
// server
socket.emit()                           // Basic emit
socket.broadcast.emit()                 // To all clients in current namespace except sender
socket.to('room1').to('room2'.emit()    // To all clients in room1 and/or 2 except sender
io.in('room1').emit()                   // To all clients in room 1
io.emit()                               // To all connected clients

// client
socket.emit()
socket.compress(false).emit()
socket.volatile.emit()


socket.emit('event name', object);  // server
socket.on('event name', (data) => {})  // listens to event name
```

### Sharing IO Across Files (Server)

```javascript
// socket.js
let io;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {throw new Error('socket io not initialized')};
    return io;
  }
}


// app.js
const server = app.listen(3000);
const io = require('../socket').init(server);
io.on('connection', socket => {
  console.log('client connected');
});


// controller.js
const io = require('../socket');

exports.createPosts = async (req, res, next) => {
  // some code
  // inform all users
  io.getIO().emit('posts', { action: 'create', msg: 'post created' });
}


// client code
someFunction() {
  fetch();
  const socket = openSocket('http://localhost:3000');
  socket.on('posts', data => {
    if (data.action === 'create') {
      // some code
    }
  })
}
```

### Client

```js
import openSocket from "socket.io-client";

useEffect(() => {
  handleNavBar("SHOW");
  const socket = openSocket("http://localhost:8080");

  socket.on("notification", (data) => {
    console.log(data);
    if (data) setNotification(data);
  });
}, []);
```
