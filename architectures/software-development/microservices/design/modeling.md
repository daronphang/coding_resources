### Loose Coupling

When services are loosely coupled, a change to one service should not require a change to another. A loosely coupled service knows as little as it needs to about the services with which it collaborates i.e. limiting the number of different types of calls from one service to another as chatty communication can lead to tight coupling.

### High Cohesion

Related behaviors should sit together as changing behaviors requires changing it in one place. If you have to change that behavior in lots of different places, have to release lots of different services to deliver that change, possibly at the same time.

### Bounded Context

Any given domain consists of multiple bounded contexts, and residing with each aremodels that do not need to be communicated outside as well as models that are shared externally with other bounded contexts. Hence, a bounded context can be defined as a specific responsibility enforced by explicit boundaries. If you want information or makg requests of functionality from a bounded context, you communicate with its explicit boundary using models.

By thinking what models should be shared and kept hidden, you can avoid one of the potential pitfalls that can result in tight coupling.

### Nested/Full Separation Context

When considering the boundaries of your microservices, think first in terms of the larger, coarser-grained contexts, and then subdivide along these nested contexts when you are looking for the benefits of splitting out these seams.

Can either have nested context whereby it makes more sense for the higher-level bounded context to not be explicitly modeled as a service boundary but nested within similar contexts as a single boundary. In the case of separated contexts, the higher-level bounded context is split out as an explicit boundary.

### Premature Decomposition

However, when starting out, getting service boundaries wrong can be costly and may be better to keep a new system on the more monolithic side first and understanding where the boundaries should exist.
