## Low Latency Server-Client Connections:
There is existing technology to enable server to send data to client (push/comet), mostly through long polling which creates the illusion of server initiated connection instead of client. With long polling, client opens HTTP connection to server which keeps it open until sending a response. However, they carry the overhead of HTTP which doesn't make them suited for low latency applications.

## Solution:
Protocol that builds up on HTTP and uses open connections to facilitate real-time bidirectional event-based communication between client and server. 

## Client-Server Communication:
Data can be sent using send(). Supports strings and binary (need use Blob or ArrayBuffer object). When messages are sent from server, onmessage() callback is triggered.

```javascript
// websocket API
const connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);

// sending data to server
socket.onopen = () => {
  connection.send('your message');
};


// receiving data from server
connection.onmessage = function (event) {
  console.log(event.data);    // actual message accessed via data property
}

connection.close();
```

