## Basics:
Bidirectional channel between Socket.IO server (node.js) and Socker.IO client (browser, node.js, python, etc) is established with WebSocket connection and will use HTTP long-polling as fallback. Consists of Engine.IO and Socket.IO API. Engine.IO is responsible for establishing low-level connection between server and client.

Socket.IO is not WebSocket implementation as it adds additional metadata to each packet. Hence, WebSocket client cannot connect to Socket.IO server and vice versa.

```javascript
// establishing connection from server
const server = app.listen(3000);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('client connected');
});

// establishing connection from client
import openSocket from 'socket.io-client';

openSocket('http://localhost:3000');
```
