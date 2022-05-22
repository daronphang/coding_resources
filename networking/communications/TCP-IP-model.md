## TCP/IP

Separate protocols that work together (stateless) and specify how computers transfer data from one device to another on internet/intranet. Emphasizes on accuracy. Default method of data communication and developed by US Department of Defense. Each device has its own TCP/IP address. It breaks messages into packets and avoid having to resend entire message in the event of missed transmission. Packets are automatically reassembled once they reach their destination. Every packet can take a different route, depending on whether the original route becomes congested/unavailable. TCP/IP is non-proprietary and hence, not controlled by any company.

IP is responsible for delivery of data packets from source to destination nodes. Primary version is IPv4; newer IPv6 addresses size contraints. TCP is responsible for maintaining a reliable connection between communicating devices and for ensuring data transfers are completed successfully. IP obtains the address while TCP guarantees delivery of data to that address.

## TCP/IP Layers

TCP/IP model is more concise framework than OSI model which consists of four layers. Though there are more than two protocols, TCP/IP are the fundamental protocols used.

### Application (Layer 4)

Layer provides applications the ability to access services of other layers, and defines the protocols that applications use to exchange data. Combines Session, Presentation and Application.

### Transport (Layer 3)

Responsible for maintaining end-to-end communications across the network. Core protocols in this layer are TCP and UDP.

### Internet/Network (Layer 2)

Responsible for host addressing, packaging, and routing functions. Deals with packets and connects independent networks to transport the packets across network boundaries. Core protocls are IP, ARP, ICMP and IGMP.

### Network Access (Layer 1)

Responsible for placing and receiving TCP/IP packets on the network medium. TCP/IP is designed to be independent of the network access method i.e. any specific network technology. Combines both Physical and Data Link.

## TCP/IP Analogy

TCP/IP relationship can be analogized to client sending an email message in puzzle form:

1. Puzzle is broken down into pieces (packets).
2. Each packet can travel through different route which may take longer than others.
3. When puzzle pieces arrive at destination, they may be out of order.
4. IP ensures puzzle pieces arrive at their destination.
5. TCP assembles puzzle on receiving side, asks for missing pieces to be resent, and informs sender that it has been received.
6. TCP also maintains connection with sender before first packet is sent to after final piece is sent.

## Three-Way Handshake

For every connection, TCP/IP establishes 3-way handshake:

1. Source sends SYN packet (initial request) to target server to start dialogue.
2. Target server sends SYN-ACK to agree the process.
3. Source sends ACK packet to target to confirm the process, after which message contents are sent.

High-level protocols including SSH, Telnet and FTP use TCP.

## Privacy

Data packets sent over TCP/IP are not private and hence, can be intercepted. One way of encrpyting data through TCP/IP is using VPN.
