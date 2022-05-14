## Required Standards (Well-Behaved)

When working through practices and thinking about the trade-offs you need to make, one of the core balances to find is how much variability to allow in your system. To identify what should be constant from service to service, need to define what a well-behaved service looks like.

### Monitoring

Essential to draw up coherent, cross-service views of your system health and not just service-specific.

Can choose to adopt a push mechanism i.e. each service needs to push logging data into a central location such as Graphite or Nagios. Otherwise, can choose polling systems that scrape data from the nodes themselves.

### Interfaces

Picking a small number of defined interface technologies (HTTP/REST) help integrate new consumers.

### Architectural safety

Need to ensure services shield themselves from unhealthy, downstream calls. Could mandate that each downstream service gets its own connection pool or circuit breaker.
