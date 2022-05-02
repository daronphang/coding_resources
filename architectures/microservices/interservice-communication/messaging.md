### Synchronous vs Asynchronous Messaging

Two basic messaging patterns that microservices can use to communicate with other microservices.

#### Synchronous

Service calls an API that another service exposes, using a protocol such as HTTP or gRPC. This option is synchronous as the caller waits for a response from the receiver.

#### Asynchronous

Service sends a message without waiting for a response, and one or more services process the message asynchronously.

It is important to distinguish between asynchronous I/O and asynchronous protocol. Asynchronous I/O means the calling thread is not blocked while the I/O completes (for performance reasons) which is an implementation detail.

