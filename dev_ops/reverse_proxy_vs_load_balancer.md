## Reverse Proxy vs Load Balancer:
Reverse proxy servers and load balancers are components in client-server ocmputing architecture whereby both act as intermediaries in communication between clients and servers, performing functions that improve efficiency.

## Load Balancer:
- Distributes incoming client requests among a group of servers, in each case returning the response from selected server to appropriate client.
- Most commonly deployed when site needs multiple servers because the volume of requests is too much for a single server to handle efficiently.
- Deploying multiple servers also eliminates single point of failure, making website more reliable.
- Distribute workload in a way that makes the best use of each server's capacity, prevents overload on any server, and results in fastest possible resposne to client.
- Enhance user experience by reducing number of error responses the client sees (diverts requests away from servers that are down). 
- Provides session persistence by sending all requests from a particular client to same server.

## Reverse Proxy:
- Accepts a request from client, forwards it to server that can fulfill it, and return server's response to client. 
- Enhances security as information about backend servers are not visible outside of internal network and protects against DDoS attacks.
- Increases scalability and flexibility as clients see only reverse proxy's IP address i.e. can change configuration of backend infrastructure. 
- Reduces time taken to generate response with compression (reducing bandwidth required for transmitting responses), SSL termination (decrypts incoming requests and encrypts server responses) and caching (stores copy of response locally).
