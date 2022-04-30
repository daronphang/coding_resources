### Services

A service is a stable address for pods; need a service to connect to pods. CoreDNS allows to resolve services by name. A way for traffic to get inside of cluster.

### ClusterIP

Default service type. Single, internal virtual IP allocated. Only reachable from within cluster (nodes and pods).

### NodePort

High port allocated on each node. Port is open on every node's IP. Anyone can connect.

### LoadBalancer

Controls a loadbalancer endpoint external to cluster. Only available when infrastructure/cloud provider gives LB. Creates NodePort+ClusterIP services.

### ExternalName

Adds CNAME DNS record to CoreDNS only. Not used for pods but for giving pods a DNS name to use outside Kubernetes.

```
$kubectl expose deployment/httpenv --port 8888         Creates a service for existing pods
$kubectl get services                                  Check what IP was allocated (cluster internal only)
$curl [IP_address_of_service]:8888

# for Windows:
$kubectl --generator=run-pod/v1 tmp-shell --rm -it --image bredfisher/netshoot -- bash
$curl httpenv:8888
```

### NodePort Service

When creating NodePort service, clusterIP will also get created. Services are additive in order:

1. ClusterIP.
2. NodePort.
3. LoadBalancer.

```
$kubectl expose deployment/httpenv --port 8888 --name httpenv-np --type NodePort
$kubectl get services
$curl localhost:32334

# Ports: 8888:32334/TCP       Right side is port exposed to localhost
```

### LoadBalancer Service

```
$kubectl expose deployment/httpenv --port 8888 --name httpenv-lb --type LoadBalancer
$kubectl get services
$curl localhost:32334

$kubectl delete service/httpenv service/httpenv-np
$kubectl delete service/httpenv-lb deployment/httpenv
```

### Namespaces

When using hostname to access services, only works for services in same Namespace.

```
$kubectl get namespaces
$curl <hostname>.<namespace>.svc.cluster.local
```
