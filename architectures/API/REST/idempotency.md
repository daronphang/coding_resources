### Idempotency

In the context of REST APIs, when making multiple identical requests that have the the same effect as making a single request, then that REST API is idempotent.

When designing REST APIs, clients can make mistakes i.e. sending duplicated requests that may be intentional/unintentional. Hence, need to make APIs fault-tolerant in such a way that the duplicated requests do not leave the system unstable.
