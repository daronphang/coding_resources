### Structure your logs appropriately

A typical microservices-based application might include several technology stacks. Should use a common structure across all services i.e. | as delimiter.

### Use a centralized log storage

Different services may span across different servers, and it would be a daunting task to implement logging in each microservice. Logs can be pushed to a centralized location so that they can be accessed in one place.

### Logs should be queryable

Use a correlation ID that is passed from one service to another if it is being called.

If using HTTP for API calls, can pass correlation ID in headers as 'X-Request-ID' or 'X-Correlation-ID'.

### Provide informative application logs

Logs should include the following information at bare minimum:

-   Service name
-   Username
-   IP address
-   Correlation ID
-   Message received time in UTC
-   Time taken
-   Method name
-   Call stack
