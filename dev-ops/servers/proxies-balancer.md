## Load Balancer

- Distributes incoming client requests among a group of servers and returning the response from selected server to appropriate client.
- Most commonly deployed when site needs multiple servers as the volume of requests is too much for a single server to handle efficiently.
- Deploying multiple servers also eliminates single point of failure, making website more reliable.
- Distribute workload in a way that makes the best use of each server's capacity, prevents overload on any server, and results in fastest possible resposne to client.
- Enhance user experience by reducing number of error responses the client sees (diverts requests away from servers that are down).
- Provides session persistence by sending all requests from a particular client to same server.

## Reverse Proxy

Reverse proxy is used by the server such as web server to achieve load balancing and high availability. Reverse proxies are used to protect servers. Takes requests from the browser and forwards them to one of the backend web servers. Nginx, Apache and HAProxy can act both as a web server and reverse proxy. Client only communicates directly with the reverse proxy server and does not know that other servers actually processed its request.

- Server that sits in front of web server that accepts a request from client, forwards it to another web server that can fulfill it, and return server's response to client.
- Enhances security as information about backend servers are not visible outside of internal network and protects against DDoS attacks.
- Increases scalability and flexibility as clients see only reverse proxy's IP address i.e. can change configuration of backend infrastructure.
- Reduces time taken to generate response with compression (reducing bandwidth required for transmitting responses), SSL termination (decrypts incoming requests and encrypts server responses) and caching (stores copy of response locally).

## Forward Proxy

Forward proxy is used by the client such as web browser. Can reside in the same internal network as the client, or it can be on the internet. Can be used to bypass firewall restrictions in order to visit websites that are blocked by school, government, etc. For instance, forward proxy can be used to hide the real IP of the client. Forward proxies are used to protect clients.

- Provides proxy services to a client or group of clients.
- Request from client are forwarded to proxy which can be allowed or denied depending on proxy's settings.
- Different clients can send out various requests to different servers through forward proxy.
- Easier to enforce authentication, SSL encryption or other security policies; used in tandem with firewall.
- Can act as a cache server in an internal network i.e. downloading of same resource.

## Reverse Proxy vs Load Balancer

Reverse proxy servers and load balancers are components in client-server computing architecture whereby both act as intermediaries in communication between clients and servers, performing functions that improve efficiency.
