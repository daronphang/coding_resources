### Synchronous

Service calls an API that another service exposes, using a protocol such as HTTP or gRPC. This option is synchronous as the caller waits for a response from the receiver. Hence, client code block their thread, until the response reach from the server. 

### Asynchronous

Service sends a message without waiting for a response, and one or more services process the message asynchronously. Most popular protocol is AMQP whereby the client sends the message to message broker systems like Kafka and RabbitMQ queue. Can be implemented in a one-to-one mode (queue) or one-to-many mode (topic). 

It is important to distinguish between asynchronous I/O and asynchronous protocol. Asynchronous I/O means the calling thread is not blocked while the I/O completes (for performance reasons) which is an implementation detail. An asynchronous protocol means the sender doesn't wait for a response.

### Asynchronous Messaging Strengths

#### Reduced Coupling

Message sender does not need to know about the consumer. 

#### Multiple Subscribers 

Using a pub/sub model, multiple consumers can subscribe to receive events.

#### Failure Isolation

If the consumer fails, the sender can still send messages. The messages will be picked up when the consumer recovers. This ability is especially useful in a microservices architecture as each service has its own lifecycle. A service could become unavailable or be replaced with a newer version at any given time. Synchronous APIs, on the other hand, require the downstream service to be available or the operation fails. 

#### Responsiveness

An upstream service can reply faster if it does not wait on downstream services. This is especially useful in a microservices architecture i.e. service A calls B, which calls C, and etc. Waiting on synchronous calls can add unacceptable amounts of latency. 

### Load Leveling 

A queue can act as a buffer to level the workload, so that receivers can process messages at their own rate.

### Asynchronous Messaging Drawbacks

#### Coupling with Messaging Infrastructure

Using a particular messaging infrastructure may cause tight coupling and will be difficult to switch to another later.

#### Latency

End-to-end latency for an operation may become high if the message queues fill up.

#### Cost 

At high throughputs, the monetary cost of the messaging infrastructure could be significant.

#### Complexity

Won't be a trivial task as you must handle duplicated messages (either by de-duplicating or making operations idempotent). Also hard to implement request-response semantics using asynchronous messaging. To send a response, you need another queue, plus a way to correlate request and response messages. 

#### Throughput 

If messages require queue semantics, the queue can become a bottleneck in the system. Each message requires at least one queue and dequeue operation. Moreover, queue semantics generally require some kind of locking inside the messaging infrastructure. 
