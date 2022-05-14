## Microservices

An approach to distributed systems that promote the use of finely-grained services with their own lifecycles, which collaborate together. By embracing, can delivery software faster, embrace newer technologies, and more freedom to react and make different decisions.

This approach values granularity, being lightweight and ability to share similar process across multiple apps. Similar to Service-Oriented Architecture (SOA), an established style of software design. However, Microservices can communicate with each other (stateless).

### Autonomous Design

- The smaller the microservices are, the benefits around interdependence increase, but complexity that arises from more moving parts increases.
- All communication between services themselves are via network calls, to enforce separation between services and avoid the perils of tight coupling.
- Services need to be able to change independently of each other, and be deployed themselves without requiring consumers to change.
- Need to think about what the services should expose and hide; too much sharing would increase coupling to internal representations and decreases autonomy.
- API exposed by services that facilitate communication between each other should use techonlogy that doesn't couple consumers i.e. picking technology agnostic APIs.

## Benefits

### Technology heterogeneity

You can decide to use different technologies inside each service and hence, allowing us to pick the right tool for each job, rather than having a standardized, one-size-fits-all approach. Taking social network as an example, we might store users' interactions in a graph-oriented database to reflect the highly interconnected nature of a social graph, but posts may be stored in a document-orinted data store.

Able to adopt new technology more quickly (reduces technology barrier) with minimized risks (deploying on services with lowest risk) as compared to deploying it on a monolithic application.

### Resilience

Key concept in resilience engineering is the bulkhead. If one component of a system fails but doesn't cascade, you can isolate the problem. Hence, service boundaries become bulkheads.

### Scaling

With a large monolithic service, you have to scale everything together. With smaller services, can just scale those services that need scaling (on-demand). Also leads to immediate cost savings.

### Ease of deployment

A one-line change to a monolithic application introduces high-risk deployments. With microservices, you can make a change to a single service and deploy it independently. Also, any problems can be isolated quickly and rollback is easy to achieve.

### Organizational alignment

Minimizes the number of people working on any one codebase to increase productivity.

### Composability

Microservices allow for functionality to be consumed in different ways for different purposes. As circumstances change, you can build things in different ways.

### Drawbacks

- Centralized logging and monitoring is needed with distributed systems.
- Partitioned database architecture requires updates in multiple databases by different services.
- Difficult to implement changes that span across multiple services.
- Extra complexity for choosing and setting up connections between dependencies.
- A Multitude of independently deployable components makes testing more difficult.
