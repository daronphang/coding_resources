## Design Interservice Communication for Microservices

Communication between microservices must be efficient and robust. With lots of small services interacting to complete a single business activity, it can be a challenge.


## Challenges

### Resiliency

There may be dozens of instances of any given microservice. An instance can fail for a number of reasons i.e. node-level failure, VM reboot, hardware failure. There are two design patterns that can help make service-to-service network calls more resilient.

#### Retry

Instead of failing outright, caller should typically retry the operation a certain number of times, or until a configured time-out period lapses. However, if an operation is not **idempotent** i.e. having the same effect while leaving the server in the same state when the request is made once or several times in a row, **retries can cause unintended side effects**. For instance, the original call might succeed but if the caller doesn't get a response, a retry may be executed. Hence, it is generally **not safe to retry POST or PATCH methods** as they are not guaranteed to be idempotent.

#### Circuit Breaker

Too many failed requests can cause a bottleneck as pending requests will accumulate in the queue. These blocked requests might hold critical system resources i.e. memory, threads, database connections, etc. which can cause cascading failures. Circuit breaker pattern can prevent a service from repeatedly trying an operation that is likely to fail. 

### Load Balancing 

When service A calls service B, the request must reach a running instance of service B. In Kubernetes, the Service resource type provides a stable IP address for a group of pods. Network traffic to the service's IP address gets forwarded to a pod by means of iptable rules. A service mesh can provide more intelligent load balancing algorithms based on observed latency or other metrics.

### Distributed Tracing 

A single transaction may span multiple services. That can make it hard to monitor the overall performance and health of the system. Even if every service generates logs and metrics, without some way to tie them together, they are of limited use. 

### Service Versioning 

When a team deploys a new version of a service, they must avoid breaking any other services or external clients that depend on it. Additionally, you may want to run multiple versions of a service side-by-side, and route requests to a particular version. 

### TLS Encryption 

For security reasons, you may want to encrypt traffic between services with TLS, and use mutual TLS authentication to authenticate callers.

### Distributed Transactions

A common challenge in microservices is correctly handling transactions that span multiple services. Often in this scenario, the success of a transaction is all or nothing i.e. if one participating service fails, the entire transaction must fail. 

There are two cases to consider:
- **Transient failure** such as a network timeout which can be resolved simply by retrying the call. If operation still fails, it is considered a nontransient failure.
- **Nontransient failure** is any failure that's unlikely to go away by itself such as invalid input. If this happens, the entire business transaction must be marked as a failure and may be necessary to undo other steps that already succeeded.

After a nontransient failure, the current transaction might be in a partially failed state, where one or more steps already completed successfully. In this case, the application needs to undo the succeeded steps by using a **Compensating Transaction** pattern.
