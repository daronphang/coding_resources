## OSI Model (Open System Interconnection)

OSI Model is a logical and conceptual/reference model that characterizes and standarizes how different software and hardware components involved in a network communication should divide labor and interact with one another. There are no real working implementations of the OSI model.

### Application (Layer 7)

Interacts directly with software applications to provide communication functions as required, and is the closest to end users. This layer also defines protocols for end applications as follows:

- Domain Name System (DNS)
- File Transfer Protocol (FTP)
- Hypertext Transfer Protocol (HTTP)
- Internet Massage Access Protocol (IMAP)
- Post Office Protocol (POP)
- Simple Mail Transfer Protocol (SMTP)
- Simple Network Management Protocol (SNMP)
- Telnet (terminal emulation)

### Presentation (Layer 6)

Layer checks the data to ensure it is compatible with the communications resources. Translates the data into the form the application layer and lower layers accept. Also handles data formatting to EBCDIC or ASCII, data compression (such as video calls for faster transmission) and encryption (text messages with password).

### Session (Layer 5)

Controls the dialogues/connections between computers. This layer establishes, manages, maintains, and terminates the connections between local and remote application. Also handles authentication and authorization functions. This layer is commonly implemented explicitly in application environments that use RPC.

### Transport (Layer 4)

Provides the functiosn and means of transferring data sequences from a source to destination host via one or more networks, while maintaining the quality of service and ensuring complete delivery of data. Integrity of data can be guaranteed via error correction. Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) are essential protocols in this layer.

TCP provides one-to-one, connection-oriented and reliable service and is responsible for sequencing and acknowledgement of packets sent, and recovery of packets lost in tramission.

UDP provides one-to-one or one-to-many, connectionless, unreliable service that is used typically when the amount of data to be transferred is small i.e. data fits into a single packet.

### Network (Layer 3)

Handles packet routing via logical addressing and switching functions. A network is a medium to which many nodes can be connected, and each node has an address. When a node needs to transfer a message to other nodes, it can merely provide the message content and the address of the destination node. If the message is long, the network may split it into several segments and sending them separately (possibly through different nodes) and reassembling the fragments at the destination node.

### Data Link (Layer 2)

Provides node-to-node transfer i.e. a link between two directly connected nodes. Layer handles packaging and unpacking the data in frames. Generally divided into two sublayers:

- Media Access Control (MAC): Responsible for controlling how devices in a network gain access to a media and permission to transmit data.
- Logical Link Control (LLC): Responsible for identifying and encapsulating network layer protocols.

### Physical (Layer 1)

Defines the electrical and physical specifications of the data connection i.e. layout of connector pins, operation voltages, optical fiber cable, and frequency for wireless devices.
