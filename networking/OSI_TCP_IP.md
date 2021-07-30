## OSI Layers:
Communication protocols are built using layers in OSI model stack. Each layer has a particular function, providing a standard service to the layer above. Have seven layers:
1. Physical (cable): Actual hardware that transmits signals over media.
2. Data link (MAC, switches): Translate binary into signals and allows upper layers to access media (Media Access Control).
3. Network (IP, routers): Determines how data is sent to receiving device, responsible for packet forwarding/routing/addressing.
4. Transport (TCP, UDP, port numbers): Coordinates data transfer between system and hosts with error-checking and data recovery.
5. Session (Syn/ack): Establishes and terminates connections between devices and determines which packets belong to text/image.
6. Presentation (encryption, ASCII, PNG, MIDI): Converts data to and from Application layer (app format to network format).
7. Application (SMTP, HTTP, FTP, DNS): What user interacts with such as web browser or Outlook.

## TCP/IP:
Separate protocols that work together (stateless) and specify how computers transfer data from one device to another on internet/intranet. Emphasizes on accuracy. Default method of data communication and developed by US Department of Defense. Each device has its own TCP/IP address. It breaks messages into packets and avoid having to resend entire message in the event of missed transmission. Packets are automatically reassembled once they reach their destination. Every packet can take a different route, depending on whether the original route becomes congested/unavailable.

IP is responsible for delivery of data packets from source to destination nodes. Primary version is IPv4; newer IPv6 addresses size contraints. TCP is responsible for maintaining a reliable connection between communicating devices and for ensuring data transfers are completed successfully. IP obtains the address while TCP guarantees delivery of data to that address. 

### TCP/IP Layers: 
TCP/IP model is more concise framework than OSI model which consists of four layers:
1. Network: Combines both Physical and Data Link from OSI; handles physical parts of sending/receiving data.
2. Internet: Controls the movement of packets around the network.
3. Transport: Responsible for providing solid/reliable data connection; level where data gets divided into packets. 
4. Application: Refers to programs that need TCP/IP to communicate with each other; combines Session, Presentation and Application.

### TCP/IP Analogy:
TCP/IP relationship can be analogized to client sending an email message in puzzle form:
1. Puzzle is broken down into pieces (packets).
2. Each packet can travel through different route which may take longer than others.
3. When puzzle pieces arrive at destination, they may be out of order.
4. IP ensures puzzle pieces arrive at their destination.
5. TCP assembles puzzle on receiving side, asks for missing pieces to be resent, and informs sender that it has been received. 
6. TCP also maintains connection with sender before first packet is sent to after final piece is sent.

### Three-Way Handshake:
For every connection, TCP/IP establishes 3-way handshake:
1. Source sends SYN packet (initial request) to target server to start dialogue.
2. Target server sends SYN-ACK to agree the process.
3. Source sends ACK packet to target to confirm the process, after which message contents are sent.

High-level protocols including SSH, Telnet and FTP use TCP.

## Privacy:
Data packets sent over TCP/IP are not private and hence, can be intercepted. One way of encrpyting data through TCP/IP is using VPN.

## TCP vs HTTP:
- HTTP is located at application layer 7 while TCP is located at abstraction layer 4.
- HTTP is one-way communication system whereas TCP is three-way handshake.
- HTTP uses port 80 while TCP uses no port.
- HTTP is utilized to access websites while TCP is session establishment protocol between client/server.
- TCP manages data stream while HTTP describes what data in the stream contains. 

