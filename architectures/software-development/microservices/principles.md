## Principles

Help us frame the various decisions when building systems.

### Model around business concpets

Interfaces structures around business-bounded contexts are more stable than those structured around technical concepts.

### Adopt a culture of automation

Microservices add a lot of complexity, and key part of which comes from the sheer number of moving parts we have to deal with. Embracing a culture of automation is a key way to address this.

Think about creating custom images to speed up deployment, and embracing the creation of fully automated immutable servers to make it easier to reason about your systems.

### Hide internal implementation details

To maximize the ability of one service to evolve independently of any others, it is vital that we hide implementation details. Modeling bounded contexts can help, as this helps us focus on those models that should be shared, and those that should be hidden.

Services should hide their databases to avoid falling into one of the most common sorts of coupling that can appear in monolithic architectures and use data pumps for reporting purposes.

When possible, pick technology-agnostic APIs to give you freedom to use different technology stacks such as REST.

### Decentralize all things

To maximize the autonomy that microservices make possible, need to be constantly looking for the chance to delegate decision making and control to the teams that own the services themselves.

Ensuring teams own their services is an important step on this journey, making teams responsible for the changes that are made, and having them decide when to release the changes.

Prefer choreography over orchestration and dumb middleware, with smart endpoints to ensure that you keep associated logic and data within service boundaries, and helping keep things cohesive.

### Independently deployable

Should always strive to ensure that our microservices can and are dpeloyed by themselves. It should be the norm that you can make a change to a single service and release it into production, without having to deploy any other services in lock-step.

By adopting a one service-per-host model, you reduce side effects that could cause deploying one service to impact another unrelated service. Consider using blue/green or canary release techniques to separate deployment from release.

### Isolate failure

A microservice architecture can be more resilient than a monolithic system if we understand and plan for failures.

When using network calls, don't treat remote calls like local calls, as this will hide different sorts of failure mode.

Make sure timeouts are set appropriately. Understand when and how to use bulkheads and circuit breakers to limit the fallout of a failing component.

### Highly observable

We cannot rely on observing the behavior of a single service instance to see if the system is functioning correctly. Instead, use semantic monitoring and aggregate logs so that when you see a problem, you can drill down to the source.
