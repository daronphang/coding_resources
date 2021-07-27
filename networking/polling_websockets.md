## Low Latency Server-Client Connections:
Web has been largely built around request/response paradigm but all HTTP communication is steered by client which required user interaction. Nonetheless, there is existing technology to enable server to send data to client (push/comet), mostly through long polling. However, they carry the overhead of HTTP and is server intensive which doesn't make them suited for low latency applications.

## AJAX Polling:
Client makes XMLHttpRequest or AJAX requests to server repeatedly at regular intervals to check for new data.

## Long Polling:
Making repeated requests to server wastes resources as each new incoming connection must be established, HTTP headers must be parsed, a query for new data must be performed, and a response must be generated and delivered. Instead of repeating this process for every client until new response data becomes available, server elects long polling technique whereby it holds a client's connection open for as long as possible and delivers a response only after data becomes available or after timeout threshold is reached. Long polling creates the illusion of server initiated connection whereby the response is triggered by server. 

## WebSocket:
Protocol that builds up on HTTP and uses open connections to facilitate real-time bidirectional event-based communication. Generally do not use XMLHttpRequest and hence, headers are not sent for every request to server which reduces expensive data loads. Located at layer 7 of OSI model or TCP layer 4. WebSocket handshake uses Upgrade Header to update protocol to WebSocket protocol. 

### Client-Server Communication:
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

## Server Sent Events (SSE):
Unlike WebSockets, SSE are one-way communication channel where events flow from server to client only. Allows clients to receive a stream of events from server over HTTP connection without polling. Client subscribes to stream and server will send message (event-stream) until server/client closes stream. SSE is more compliant with existing IT infrastructure like load balancer, firewall, etc. unlike WebSockets which can be blocked by firewall.
