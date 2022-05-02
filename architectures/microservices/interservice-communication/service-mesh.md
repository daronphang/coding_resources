### Service Mesh

A service mesh is a software layer that handles service-to-service communication and designed to address many of the challenges of microservices architecture. This is done by moving the responsibility away from microservices themselves and into a shared layer. The service mesh acts as a proxy that intercepts network communication between microservices in the cluster. Currently, the service mesh concept applies mainly to container orchestrators, rather than serverless architectures. Service mesh is also an example of the Ambassador pattern i.e. a helper service that sends network requests on behalf of the application.

Nonetheless, implementing a service mesh adds complexity to the setup and configuration of the cluster. There also may be performance implications as requests now get routed through the service mesh proxy, and extra services are now running on every node in the cluster. Should perform a thorough performance and load testing before deploying a service mesh in production.


