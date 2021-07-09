## Basics:
Container orchestration platform that takes a series of nodes and decides how to run container workloads across nodes. Runs on top of Docker. Set of APIs that run on apps in containers to manage a set of servers and then execute containers on Docker. Provides API/CLI to manage containers across servers. Control plane consists of Masters and Nodes.

Comes unopinionated i.e. don't have to adopt a particular workflow to make something work. Have Imperative and Declarative.

### Terms:
- Kubectl: CLI used to configure Kubernetes.
- Node: Single server in the Kubernetes cluster.
- Kubelet: Kubernetes agent running on nodes.
- Control Plane: Set of containers that manage the cluster including API server, scheduler, controller manager, etcd, and more.
- Pod: One or more containers running together on one node.
- Controller: Creating/updating pods and other objects.
- Service: Network endpoint to connect to a pod.
- Namespace: Filtered group of objects in cluster. 

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

## CLI:
```
kubectl run my-nginx --image nginx                Pod creation (v1.18 and above)
kubectl create deployment nginx --image nginx     Creates Deployment
kubectl create -f file.yml                        Create resources via CLI or YAML
kubectl replace -f file.yml
kubectl apply                                     Create/update anything via YAML

kubectl delete deployment my-nginx
kubectl delete pod/my-nginx-544232

kubectl get pods/all
kubectl get pods -w                               Refreshes every few seconds

kubectrl logs deployment/my-nginx --follow --tail 1
kubectl logs -l run-my-nginx                      Label command
kubectl describe pod/my-nginx                     Similar to docker inspect

kubectl scale deploy/my-nginx --replicas 2        deploy/ same as deployment
```

## Abstraction Layers:
When kubectl create, it creates the Deployment controller -> Replicaset -> Pod. Replicaset is to ensure two pods are running with identical template. Deployment's job is to manage the Replicaset configuration.

## Generators:
Helper templates for Run, Create and Expose commands. Every resource has a specification. Shows the output generated with that command.

```
kubectl create deployment sample --image nginx --dry-run -o yaml
kubectl create job test --image nginx --dry-run -o yaml
```

## Imperative vs Declarative:
- Imperative refers to how a program opereates, Declarative focuses on what it should accomplish (end state).
- RUN, CREATE, UPDATE are Imperative.
- -Middle ground is using Imperative objects such as create -f file.yml.
- APPLY is Declarative; requires understanding of YAML keys and values and easiest to automate.
- Overall, don't mix three approaches.

## Storage/Volume: 
Orchestration was initially designed around containers being immutable; having storage/stateful workloads will add complexity to the system. StatefulSets is a new resource type that makes Pods more sticky. Volumes are tied to the lifecycle of a Pod; all containers in single Pod can share them. PersistentVolumes is created at cluster level and outlives a Pod. For third-party storage, Container Storage Interface (CSI) plugins are used to connect to them.

## Ingress:
None of Service types work at OSI Layer 7 (HTTP). For multiple sites sharing same ports i.e. 80, Ingress Controllers help to route outside connections based on hostname or URL to different containers. Vendors that make the controllers include Nginx, Traefik, HAProxy, F5, Envoy, Istio, etc. 

## Higher Deployment Abstractions:
Helm is the de facto that everyone looks to for creating templates and using templating YAML standards for deploying third-party apps. However, there are over 60 third-party tools to do this. For Docker, can use compose yaml to deploy on Kubernetes. 
