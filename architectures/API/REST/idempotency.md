### Idempotency

In the context of REST APIs, an indempotent HTTP method is one that can be invoked many times without having different outcomes (but may have different response status received by the client). In other words, the result of a successfully performed request is independent of the number of times it is executed, and there is no change of state for any resource on the server-side. 

When designing REST APIs, clients can make mistakes i.e. sending duplicated requests that may be intentional/unintentional. Hence, need to make APIs fault-tolerant in such a way that the duplicated requests do not leave the system unstable. Nonetheless, it is still the responsibility of the service implementer to fulfill the promise of idempotency as it is not enforced i.e. PUT is only for UPDATE, GET does not change any resources on the server, etc.

### HTTP Methods

```
              Safe    Idempotent
GET           Yes     Yes  
PUT           No      Yes
DELETE        No      Yes
HEAD          Yes     Yes
OPTIONS       Yes     Yes
POST          No      No
```
