### Backends for Frontends

Create separate backend services to be consumed by specific frontend applications or interfaces. This pattern is useful when you want to avoid customizing a single backend for multiple interfaces.

### Context and Problem

An application may initially be targeted at desktop web UI where typicall the backend is created in parallel to provide the features needed for that UI. As the application's user base grows, a mobile application is developed that must interact with the same backend. 

However, the capabilities of a mobile device differ significantly from a desktop browser i.e. screen size, performance, display limitations, etc. These differences result in competing requirements for the backend, and require regular and significant changes to serve both UI interfaces. Conflicting update requirements, the need to keep the service working for both frontends, can result in spending a lot of effort on a single deployable resource. 

### Solution 

Create one backend per user interface. Fine-tune the behavior and performance of each backend to best match the needs of the frontend environment, without worrying about affecting other frontend experiences. 

### When to Use This Pattern 

Use this pattern when:
- A shared or general purpose backend service must be maintained with significant development overhead. 
- You want to optimize the backend for requirements of specific client interfaces. 
- Customizations are made to a general-purpose backend to accommodate multiple interfaces. 

May not be suitable when:
- Interfaces make the same or similar requests to the backend. 
- Only one interface is used to interact with the backend. 

### Issues and Considerations

- Consider how many backends to deploy. 
- Code duplication across services is highly likely when implementing this pattern.
- Frontend-focused backend services should only contain client-specific logic and behavior. General business logic should be managed elsewhere.
