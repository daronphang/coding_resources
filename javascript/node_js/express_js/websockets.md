## Basics:
Protocol that builds up on HTTP and uses open connections to facilitate real-time bidirectional event-based communication between client and server. 


and pushes data from server to client and vice versa instead of request response. Enables real-time Can use Socket.IO library. Need to configure for both frontend and backend. 

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
