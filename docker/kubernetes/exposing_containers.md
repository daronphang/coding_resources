## Services:
A service is a stable address for pods; need a service to connect to pods. CoreDNS allows to resolve services by name. A way for traffic to get inside of cluster. 

### ClusterIP:
Default service. Single, internal virtual IP allocated. Only reachable from within cluster (nodes and pods). 

### NodePort:
High port allocated on each node. Port is open on every node's IP. Anyone can connect.

## LoadBalancer:
Controls a loadbalancer endpoint external to cluster. Only available when infrastructure provider gives LB. Creates NodePort+ClusterIP services.

## ExternalName:
Adds CNAME DNS record to CoreDNS only. Not used for pods but for giving pods a DNS name to use outside Kubernetes.  

```
kubectl expose                      Creates a service for existing pods
```
