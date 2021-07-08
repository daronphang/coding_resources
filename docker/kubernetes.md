## Basics:
Container orchestration platform that takes a series of nodes and decides how to run container workloads across nodes. Runs on top of Docker. Set of APIs that run on apps in containers to manage a set of servers and then execute containers on Docker. Provides API/CLI to manage containers across servers. Control plane consists of Masters and Nodes.

### Terms:
- Kubectl: CLI used to configure Kubernetes.
- Node: Single server in the Kubernetes cluster.
- Kubelet: Kubernetes agent running on nodes.
- Control Plane: Set of containers that manage the cluster including API server, scheduler, controller manager, etcd, and more.
- Pod: One or more containers running together on one node.
- Controller: Creating/updating pods and other objects.

### Master configuration setup:
- etcd: Distributed storage system for key values similar to Swarm's RAFT algorithm.
- API: Talking to cluster and issue orders to it.
- Scheduler Container: Controls how/where containers are placed on nodes in objects called pods.
- Controller Manager: Looks at state of whole cluster and compares the instructions given and output.
- Core DNS.
- Docker.

### Node configuration setup:
- Kubelet.
- Kube-proxy: Control networking.

## Distributions:
Cloud or self-managed including Docker Enterprise, Rancher, OpenShift, Canonical, VMWare PKS.
