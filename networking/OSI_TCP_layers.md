## OSI Layers:
Communication protocols are built using layers in OSI model stack. Each layer has a particular function, providing a standard service to the layer above. Have seven layers:
1. Physical (cable): Actual hardware that transmits signals over media.
2. Data link (MAC, switches): Translate binary into signals and allows upper layers to access media.
3. Network (IP, routers): Determines how data is sent to receiving device, responsible for packet forwarding/routing/addressing.
4. Transport (TCP, UDP, port numbers): Coordinates data transfer between system and hosts with error-checking and data recovery.
5. Session (Syn/ack): Establishes and terminates connections between devices and determines which packets belong to text/image.
6. Presentation (encryption, ASCII, PNG, MIDI): Converts data to and from Application layer (app format to network format).
7. Application (SNMP, HTTP, FTP): What user interacts with.

## TCP/IP:
Suite of communication protocols (stateless) used to interconnect network devices on the internet/intranet. Specifies how data is exchanged by providing end-to-end communications that identify how it should be broken into packets, addressed, transmitted, routed and recived at destination. TCP/IP also includes HTTP, HTTPS and FTP (File Transfer Protocol). 

Internet Protocol is responsible for logical addressing i.e. ensures data packets are sent to right address. Primary version is IPv4; newer IPv6 addresses size contraints. Transmission Control Protocol is reponsible for transporting and routing data through network architecture and ensuring it gets delivered to destination application or device. IP obtains the address while TCP guarantees delivery of data to that address. 

TCP/IP model is more concise framework than OSI model which consists of four layers:
1. Network: Combines both Physical and Data Link from OSI.
2. Internet
3. Transport
4. Application: Combines Session, Presentation and Application from OSI.

TCP/IP relatiosnhip can be analogized to client sending an email message in puzzle form:
1. Puzzle is broken down into pieces.
2. Each piece (packet) can travel through different route which may take longer than others.
3. When puzzle pieces arrive at destination, they may be out of order.
4. IP ensures puzzle pieces arrive at their destination.
5. TCP assembles puzzle on receiving side, asks for missing pieces to be resent, and informs sender that it has been received. 
6. TCP also maintains connection with sender before first packet is sent to after final piece is sent.

For every connection, TCP/IP establishes 3-way handshake:
1. Source sends SYN packet (initial request) to target server to start dialogue.
2. Target server sends SYN-ACK to agree the process.
3. Source sends ACK packet to target to confirm the process, after which message contents are sent.



High-level protocols including SSH, Telnet and FTP use TCP.

## Privacy:
Data packets sent over TCP/IP are not private and hence, can be intercepted. One way of encrpyting data through TCP/IP is using VPN.

