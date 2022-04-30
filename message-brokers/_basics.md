### Message Brokers

Any application, service or software that consists of multiple parts communicating with each other, after reaching moderate complexity, requires some form of event/message management. Such platforms may come in a message queue or broker.

A message broker acts as a middleman for various services to reduce loads and delivery times by delegating tasks that would take up a lot of time or resources to a third party that has no other job. Uses asynchronous messaging to pass information from producers to consumers. If the consumer is at max capacity or not ready, the message is stored. Storing messages can allow producers and consumers to be active at different times and hence, reduces coupling and increasing the system's fault tolerance.

Message queueing allows web servers to respond to requests quickly instead of being forced to perform resource-heavy procedures on the spot that may delay response time. Also useful when you want to distribute a message to multiple consumers or to balance loads between workers.

### Messaging Protocols

- AMQP: Advanced Message Queuing Protocol

### Architecture

1. Client applications (producers) create/publish messages and deliver them to the broker.
2. Broker receives the message and enqueues them to a specific queue.
3. Other software applications (consumers) connected to the queue subscribe to the messages (dequeue) and process them.

Software may act as a producer, consumer, or both. Both producers and consumers may be on the same/different server, and the request can be created in one programming language and handled in another. Hence, two applications will only communicate through the messages they are sending to each other i.e. promotes loose coupling.

### Concepts

- **Producer**: Application that sends the messages.
- **Consumer**: Application that receives the messages.
- **Queue**: Buffer that stores messages.
- **Connection**: TCP connection between application and broker.
- **Channel**: Virtual connection inside a connection during publishing/consuming.
- **Exchange**: Receives messages from producers and pushes them to queues specified by the rules.
- **Binding**: Link between a queue and an exchange.
- **Routing Key**: Key that the exchange looks at to decide how to route the messages to queues.
- **Virtual Host**: Provides a way to segregate applications using the same broker instance.
