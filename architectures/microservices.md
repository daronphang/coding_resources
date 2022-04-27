### Microservices

An architectural style that structures an application as a collection of services (compared to traditional monolithic approach) that are:

- Highly maintainable, accessible and testable (easier for developers to understand and update).
- Loosely coupled and resilient (one team's changes won't break entire app).
- Independently deployable to meet changing business needs.
- Organized around business capabiilities.

This approach values granularity, being lightweight and ability to share similar process across multiple apps. Similar to Service-Oriented Architecture (SOA), an established style of software design. However, Microservices can communicate with each other (stateless).

Dependencies between services and their consumers are minimized by applying the principle of loose coupling.

### Strengths

- Tackles problem of complexity by decomposing application into a set of manageable services which are much faster to develop and maintain.
- Enables each service to be developed independently.
- Reduces barrier of adopting new technologies.
- Enables each service to be scaled independently.

### Drawbacks

- Centralized logging and monitoring is needed with distributed systems.
- Partitioned database architecture requires updates in multiple databases by different services.
- Difficult to implement changes that span across multiple services.
- Extra complexity for choosing and setting up connections between dependencies.
- A Multitude of independently deployable components makes testing more difficult.
