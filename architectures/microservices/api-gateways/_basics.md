## API Gateway

An API gateway is an API management tool taht sits between a client and a collection of backend services. Acts as a reverse proxy to accept all API calls, aggregate the various services required to fulfill them, and return the appropriate result. It is responsible for request routing, composition, and protocol translation. If there are failures in the backend services, the API gateway can mask them by returning cached or default data. 

Offers clients a simple and dependable experience, and decouples client interface from backend implementation. When a client makes a request, the API gateway breaks it into multiple requests, invokes multiple microservices and routes to the right places, aggregates the results, produces a response, and keeps track of everything.

## Why use an API gateway?

Msot enterprise APIs are deployed via API gateways. It is common for API gateways to handle common tasks that are used across a system of API services such as user authentication, rate limiting and statistics. When hosting large-scale APIs:
- You want to protect your APIs from overuse and abuse, so you use an authentication service and rate limiting.
- You want to understand how people use your APIs by adding analytics and monitoring tools.
- If APIs are monetized, need to connect to a billing system.
- When adopting a microservice architecture, a single request could require calls to dozens of distinct applications.
- Over time new API services are added and others are retired, but clients will still want to find all services in the same place.

## Benefits

### Decoupling

If your clients (which may have no control of) communicated directly with many separate services, renaming or moving those services can be challenging as the client is coupled to the underlying architecture and organization. API gateways enables you to route based on path, hostname, headers, and other key information enabling you to decouple the publicly facing API endpoints from the underlying microservice architecture.

### Reduced Round Trips

Certain API endpoints may need to join data across multiple services. API gateways can perform this aggregration so taht the client does not need complicated call chaining and reduce number of round trips.

### Security

API gateways provide a centralized proxy server to manage rate limiting, bot detection, authentication, CORS, and etc. Many API gateways allow setting up a datastore such as Redis to store session information.

### Cross Cutting Concerns

Logging, caching, and other cross cutting concerns can be handled in a centralized application rahter than deployed to every microservice. 
