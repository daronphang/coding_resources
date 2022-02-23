### Exponential Backoff
An algorithm that uses feedback to multiplicatively decrease the rate of some process, in order to gradually find an acceptable rate. A standard error-handling strategy for network applications to ensure devices do not generate excessive load.

When devices retry calls without waiting, can produce heavy load on servers.

### Example
1. Make a request to server.
2. If request fails, wait 1 + random_number_milliseconds and retry request.
3. If request fails, wait 2 + random_number_milliseconds and retry request.
