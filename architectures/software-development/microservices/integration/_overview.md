## Integration (Inter-Communication)

Getting integration right is the most important aspect of the technology associated with microservices.

### Avoid database integration at all costs

Database intergration is a form whereby services simply reach into the database to retrieve or change resource. However, this is fraught with difficulties as we are allowing external parties to view and bind to internal implementation details. The data structures stored in DB is shared across all parties, and if schema changes, it will break consumers. Also, it is tied to a specific technology choice, and makes it difficult to switch i.e. from relational to non-relational. Moreover, all logic associated with manipulating the DB is spread across all consumers, and changes to that behavior requires changing all consumers.

### Avoid breaking changes

A change may require consumers of the service to also change. Hence, should pick a technology that ensures this happens as rarely as possible. For instance, if a microservice adds new fields to a piece of data it sends out, existing consumers should not be impacted.

### Keep APIs technology-agnostic

IT industry is rapidly changing with new tools, frameworks and languages coming out all the time, and sometimes these alternative technology stack may make you more productive. Hence, it is important to ensure that you keep APIs used for communication between microservices technology-agnostic.

### Make service simple for consumers

You should make it easy for consumers to use your service such as providing clients full freedom in their technology choice.

### Hide internal implementation detail

Avoid having consumers to be bound to your internal implementation which leads to increased coupling i.e. changing something inside requires changing on consumers' sides.
