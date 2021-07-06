## Basics:
Transmission Control Protocol/Internet Protocol is a suite of communication protocols (stateless) used to interconnect network devices on the internet/intranet. Specifies how data is exchanged by providing end-to-end communications that identify how it should be broken into packets, addressed, transmitted, routed and recived at destination. TCP/IP also includes HTTP, HTTPS and FTP (File Transfer Protocol). 

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

Primary version is IPv4; newer IPv6 addresses size contraints. 
