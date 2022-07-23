## Apache

An open-source industrial-strength web server that is responsible for delivering web content through the internet i.e. processes requests and serves web assets and content via HTTP. Server is developed and maintained by an open-community of developers. Mostly run on Linux and powers around 46% of all websites around the world. It is the key component of LAMP stack (Linux, Apache, MySQL, PHP).

### Architecture

Apache functions as a way to communicate over networks from client to server using TCP/IP protocol. Can be used for a wide variety of protocols, but most common is HTTP/S.

Apache server is configured via config files in which modules are used to control its behavior. Listens to IP addresses configured in its config files by default.

With the Listen directive, Apache can accept and route specific traffic to certain ports and domains. Allows for many different websites and domains to be hosted on a single server by bounding them to different ports i.e. domain1.com on port 80, domain2.com on port 8080.

Once a message reaches its destination or recipient, it sends a notice or ACK message. If there is an error in receiving data, or packets were lost in transit, the destination host/client sends a Not Acknowledged (NAK) message, to inform the sender that the data needs to be retransmitted.

### Pros

- Ability to handle large amounts of traffic with minimal configuration.
- Scales with ease and easily configurable with its modular functionality.

### Features

- Handling of static files.
- Loadable dynamic modules.
- Auto-indexing.
- Compatible with IPv6.
- Supports HTTP/2.
- FTP connections.
- Gzip compression and decompression.
- Bandwidth throttling.
- Load balancing.
- Session tracking.
- URL rewriting.
- Geolocation based on IP address.
