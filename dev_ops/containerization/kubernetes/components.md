### Master Machine Components

- Etcd: Stores configuration information, which can be used by each of nodes in cluster. High availability key value store that can be distributed among multiple nodes.
- API Server: Provides all operation on cluster using API. API server implements an interface which means different tools and libraries can readily comunicate with it.
- Controller Manager: Responsible for most of collectors that regulate the state of cluster and perform a task. Can be considered as a daemon which runs in a non-terminating loop and responsible for collecting and sending information to API server.
- Scheduler: Service in master which is responsible for distributing the workload, tracking utilization of working load on cluster nodes and placing workload on which resources are available and accepting the workload i.e. allocating pods to nodes.

### Node Components

- Docker: Helps running encapsulated application containers in isolated and lightweight operating environment.
- Kubelet Service: Small service in each node responsible for relaying information to and from the control plane service and interacts with etcd store to read configuration details and Wright values.
- Proxy Service: Runs on each node and helps in making services available to external host and forwarding request to correct containers.
