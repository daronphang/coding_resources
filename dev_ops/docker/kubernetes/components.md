## Master Machine Components:
### Etcd:
Stores configuration information, which can be used by each of nodes in cluster. High availability key value store that can be distributed among multiple nodes.

### API Server:
Provides all operation on cluster using API. API server implements an interface which means different tools and libraries can readily comunicate with it.

### Controller Manager:
Responsible for most of collectors that regulate the state of cluster and perform a task. Can be considered as a daemon which runs in a non-terminating loop and responsible for collecting and sending information to PAI server.
