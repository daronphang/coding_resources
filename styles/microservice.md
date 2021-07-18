## Microservice:
An architectural style that structures an application as a collection of services (compared to traditional monolithic approach) that are:
- Highly maintainable, accessible and testable (easier for developers to understand and update).
- Loosely coupled and resilient (one team's changes won't break entire app).
- Independently deployable to meet changing business needs.
- Organized around business capabiilities.

This approach  values granularity, being lightweight and ability to share similar process across multiple apps. Similar to Service-Oriented Architecture (SOA), an established style of software design. However, Microservices can communicate with each other (stateless). 

### Challenges:
- Logging/Monitoring: Need centralized logs with distributed systems.
- Building: Need to identify dependencies between services.
- Testing: Integration testing becomes more difficult. 
