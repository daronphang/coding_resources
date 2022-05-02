## API Design

Good API design is important in a microservices architecture as all data exchange between services happens either through messages or API calls. APIs must be efficient to avoid creating chatty I/O. As services are designed by teams working independently, APIs must have well-defined semantics and versioning schemes so that updates don't break other services.

## API Types

### Public API 

These are APIs that client applications call such as browser or native mobile applications. Most of the time, public API will use REST over HTTP. 

### Backend API

Used for interservice communication. Need to take network performance into account. Depending on the granularity of services, interservice communication can result in a lot of network traffic and may become I/O bound. Hence, considerations such as serialization speed and payload size become more important. Some popular alternatives to using REST over HTTP include gRPC, Apache Avro, and Apache Thrift. These protocols support binary serialization and are generally more efficient than HTTP. 

## Considerations

### REST vs RPC

REST models resources, which can be a natural way to express your domain model. Defines a uniform interface based on HTTP verbs, which encourages evolvability. 

RPC is more oriented around operations or commands. As RPC interfaces look like local method calls, it may lead you to design overly chatty APIs.

### Efficiency

Consider efficiency in terms of speed, memory, and payload size. Typically a gRPC-based interface is faster than REST over HTTP.

### Interface Definition Language (IDL)

an IDL is used to define the methods, parameters, and return values of an API. An IDL can be used to generate client code, serialization code, and API documentation. IDLs can also be consumed by API testing tools such as Postman. 

### Serialization

Options include text-based formats (primarily JSON) and binary formats such as protocol buffer. Binary formats are generally faster than text-based formats, but JSON has advantages in terms of interoperability as most languages and frameworks support JSON serialization. 

### Framework and Langauge Support

HTTP is supported in nearly every framework and langauge. gRPC, Avro and Shift all have libraries for C++, C#, Java, Go and Python.

### Compatibility and Interoperability

If you choose a protocol like gRPC, you may need a protocol translation layer between the public API and the backend. A gateway can perform that function. If you are using a service mesh, consider which protocols are compatible with the service mesh. 

### Others

Watch out for APIs that leak internal implementation details or simply mirror an internal database schema. The API should model the domain and should only change when new functionality is added, not just because you refactored some code or normalized a database table.

Different types of client, such as mobile application and web browser, may require different payload sizes or interaction patterns. Consider using **Backends for Frontends pattern** for create separate backends for each client, that expose an optimal interface for that client.

For operations with side effects, consider making them idempotent and implementing them as PUT methods. This will enable safe retries and can improve resiliency. 

HTTP methods can have asynchronous semantics, where the method returns a response immediately but the service carries out the operation asynchronously. In this case, the method should return HTTP 202 status code, which indicates the request was accepted for processing, but the processing itself is not completed.

### Recommendation

Baseline recommendation is to choose REST over HTTP unless you need the performance benefits of a binary protocol. REST over HTTP requires no special libraries and creates minimal coupling. There are also rich ecosystems of tools to support schema definitions, testing and monitoring of RESTful HTTP endpoints. 
