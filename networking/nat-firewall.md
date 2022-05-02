### Firewall

Stands between local network and wider net; compares information returning with information requested and those that match gets through. Have software, hardware and cloud-based firewalls.

### NAT Firewall

Network Address Translation. Invented to solve problem presented by IPv4 protocol which is a shortage of IP addresses. Operates on router to protect private networks. Works by allowing internet traffic to pass through if a device on private network requested it.

Router is assigned with single public IP address that is visible; devices connected to router are assigned with private IP addresses (not aollowed to communicate directly with web servers). NAT helps to direct traffic back and forth. Uses NAT forwarding table to change private IP and send web information back to device that requested it.

### NAT Protection

1. Protects the identity of network and doesn't show internal IP addresses to the internet.
2. Requires every incoming packet of information to have been asked for by a device.
3. Can use whitelisting to block unauthorized outgoing traffic i.e. if have malware, can prevent from communicating with device.

### How NAT firewall works

1. Device sends a request to web server by sending data packets (includes sender/receiver IPs, port numbers, etc).
2. Traffic goes through router with NAT firewall that changes data packet's private IP to router's public IP.
3. Data packets reach web server and get necessary information.
4. Information travels back to router which uses its NAT forwarding table to determine which device requested it.
5. NAT changes the data packet's public IP to its previous private IP and information is sent to requested device.

### VPN

VPN connects devices from all over the world to a remote server with a public-facing IP address and provides encryption. Can also bypass Webmaster restrictions whererby users can connect to a remote IP that corresponds to a location where the service is not restricted.
