## Event-Based (Asynchronous)

Need to consider a way for microservices to emit events, and a way for consumers to find out whether those events have happened.

### Message Brokers

Message broker RabbitMQ tries to handle both problems. Producers use an API to publish an event to the broker. The broker handles subscriptions, allowing consumers to be informed when an event arises. These brokers can also handle the state of consumers i.e. help keep track of what messages they have seen before.

These systems are normally designed to be scalable and resilient, but doesn't come for free. Can add complexity to the development process but is an effective way to implement loosely coupled, event-driven architectures.

### HTTP

Another approach is to try use HTTP as a way to propagate events. ATOM is a REST-compliant specification that defines semantics for publishing feeds of resources. Many client libraries exist that allows us to create and consume these feeds. However, there are some patterns (Competing Consumer pattern) that you can get out of the box with message brokers, but requires duplicated efforts if using ATOM to make it work.

## Complexities

Asynchronous implementation will require different thinking for programmers who are accustomed to intra-process synchronous message calls as some problems are not immediately obvious. For instance, when considering long running async request/response, need to think about what to do when the response comes back:

- Does it come back to the same node that initiated the request?
- What if the node is down?
- Do you need to store information elsewhere so you can react accordingly?

Additionally, if you never specify a maximum retry limit, it may cause **catastrophic failover** whereby workers keep dying in succession as they try to take on a bad job that gets put back on the queue if failed.

If planning to implement asynchronous architecture, ensure that you have a good monitoring in place, and consider the use of correlation IDs to trace requests across process boundaries.

## Asynchronous Benefits

### Reduced Coupling

Message sender does not need to know about the consumer.

### Multiple Subscribers

Using a pub/sub model, multiple consumers can subscribe to receive events.

### Failure Isolation

If the consumer fails, the sender can still send messages. The messages will be picked up when the consumer recovers. This ability is especially useful in a microservices architecture as each service has its own lifecycle. A service could become unavailable or be replaced with a newer version at any given time. Synchronous APIs, on the other hand, require the downstream service to be available or the operation fails.

### Responsiveness

An upstream service can reply faster if it does not wait on downstream services. This is especially useful in a microservices architecture i.e. service A calls B, which calls C, and etc. Waiting on synchronous calls can add unacceptable amounts of latency.

### Load Leveling

A queue can act as a buffer to level the workload, so that receivers can process messages at their own rate.

## Asynchronous Drawbacks

### Coupling with Messaging Infrastructure

Using a particular messaging infrastructure may cause tight coupling and will be difficult to switch to another later.

### Latency

End-to-end latency for an operation may become high if the message queues fill up.

### Cost

At high throughputs, the monetary cost of the messaging infrastructure could be significant.

### Complexity

Won't be a trivial task as you must handle duplicated messages (either by de-duplicating or making operations idempotent). Also hard to implement request-response semantics using asynchronous messaging. To send a response, you need another queue, plus a way to correlate request and response messages.

### Throughput

If messages require queue semantics, the queue can become a bottleneck in the system. Each message requires at least one queue and dequeue operation. Moreover, queue semantics generally require some kind of locking inside the messaging infrastructure.
