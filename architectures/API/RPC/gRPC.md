## gRPC

gRPC is an open-source framework for implementing RPC APIs via HTTP/2 developed by Google to efficiently connect services and build distributed systems.. Offers a refreshed take on the old RPC design method by making it interoperable, modern, and efficient using technologies including Protocol Buffers (to define service contracts) and HTTP/2.

Protocol Buffers (Protobuf) allow you to define the interface to be used in service-to-service communication regardless of the programming language. gRPC framework allows developers to create services that can communicate with each other efficiently and independently from their preferred programming language.

Once you define a contract with Protobuf, this contract can be used by each service to automatically generate the code that sets up the communication infrastructure. This feature simplifies the creation of service interaction and together with high performance, it makes it the ideal framework for creating microservices.

## Protocol Buffers for defining schema

gRPC uses Protocol Buffers by default. They are Google's open source mechanism for serializing structured message data and used in nearly all inter-machine communication at Google. They are used as an alternative to XML and JSON.

As data is represented in binary format, parsing with protobufs is less CPU-intensive than JSON and XML and hence, message exchange happens faster. Additionally, schema is enforced to ensure the message doesn't get lost between applications and its structural components stay intact in another service.

Main goal of protobufs is optimization. By removing many responsibilities done by data formats and making it focus only performing serialization and deserialization, it ensures data is transmitted as fast as possible in the most compact way. **This is valuable when building distributed applications and services**.

### Procedure

1. Programmer defines a schema in a .proto text file, how they want data to be structured. Numbers are used instead of field names to save storage. Documentation can also be embedded in the schema.
2. Using a protoc compiler, the file is automatically compiled into any of the numerous supported languages.
3. At run-time, the messages are compressed and serialized in binary format.

## Method Types

### Unary

Client sends a single request to the server and returns a single response back.

### Server Streaming

Client sends a request to the server and gets a stream to read a sequence of messages back. Client reads from the returned stream until there are no more messages. gRPC guarantees message ordering within an individual RPC call.

### Client Streaming

Client writes a sequence of messages and sends them to the server using a provided stream. Once it has finished writing, it waits for the server to return a response.

### Bidirectional Streaming

Both sides send a sequence of messages using a read-write stream. The two streams operate independently, so clients and servers can read and write in whatever order they like i.e. server can receive all messages before writing its responsesm or read a message and write a message.

## gRPC vs REST (Benefits)

### Lightweight messages

gRPC-specific messages can be up to 30% smaller in size than JSON messages.

### High performance

gRPC is between 5 to 8 times faster than REST+JSON communication.

### Built-in code generation

gRPC has automated code generation in different programming langauges including Java, C++, Python, Go, Ruby, and Dart.

### No serialization needed

For gRPC, do not need to serialize between different languages as data type is clear on the contract and the code for your target language is generated from there.

### More connection options

While REST focuses on request-response architecture, gRPC provides support for data streaming with event-driven architectures: server-side, client-side, and bidirectional streaming.

## gRPC vs REST (Drawbacks)

### Lack of maturity

Has minimal developer support outside of Google and not many tools created for HTTP/2 and protocol buffers, community lacks information about best practices, workarounds, and success stories.

### Limited browser support

Since gRPC relies on HTTP/2, you can't call a gRPC service from a web browser directly as no modern browsers can access HTTP/2 frames. This requires using a proxy which has its limitations.

### Not human-readable format

By compressing data into binary, protobuf files become non-human readable, unlike XML and JSON. Developers need to use gRPC command line tool and server reflection tool to perform debugging or analyze payloads.

## When to use gRPC

- Real-time communication services where you deal with streaming calls.
- Efficient communication is needed.
- In multi-language environments.
- For internal APIs where you don't have to force technology choices on clients.
