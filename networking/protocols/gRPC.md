### gRPC (Remote Procedure Calls)

gRPC is an open-source RPC system developed at Google to efficiently connect services and build distributed systems. It is focused on high performance and uses the HTTP/2 protocol to transport binary messages. It relies on the Protocol Buffers language to define service contracts. Protocol Buffers (Protobuf) allow you to define the interface to be used in service-to-service communication regardless of the programming language. gRPC framework allows developers to create services that can communicate with each other efficiently and independently from their preferred programming language. 

Once you define a contract with Protobuf, this contract can be used by each service to automatically generate the code that sets up the communication infrastructure. This feature simplifies the creation of service interaction and together with high performance, it makes it the ideal framework for creating microservices.

### Procedure

In gRPC, a client application can directly call a method on a server application on a different machine and hence, making it easy for you to build distributed applications and services. gRPC clients and servers can work and talk to each other in different environments and languages i.e. creating gRPC server in Java with clients in Go, Python and Ruby.

### Protocol Buffers 

gRPC uses Protocol Buffers by default. They are Google's open source mechanism for serializing structured data. When working with protocol buffers, the first step is to define the structure of the data you want to serialize in a proto file with extension .proto. 

### Method Types

#### Unary

Client sends a single request to the server and returns a single response back.

#### Server Streaming

Client sends a request to the server and gets a stream to read a sequence of messages back. Client reads from the returned stream until there are no more messages. gRPC guarantees message ordering within an individual RPC call. 

#### Client Streaming

Client writes a sequence of messages and sends them to the server using a provided stream. Once it has finished writing, it waits for the server to return a response.

#### Bidirectional Streaming

Both sides send a sequence of messages using a read-write stream. The two streams operate independently, so clients and servers can read and write in whatever order they like i.e. server can receive all messages before writing its responsesm or read a message and write a message.

### gRPC vs REST

#### Serialization/Deserialization

For gRPC, do not need to serialize between different languages as data type is clear on the contract and the code for your target language is generated from there.
