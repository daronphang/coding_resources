### YAML

Each file can contain more than one manifest. Each manifest describes an API object (deployment, job, secret) and requires four parts:

1. apiVersion
2. kind
3. metadata
4. spec

```
$kubectl apply -f filename.yml           Create/update resources in a file
$kubectl apply -f myyaml/                Create/update whole directory of yaml
$kubectl -f app.yml --dry-run
$kubectl diff -f app.yml                 Compares your yml with server's yml

$kubectl api-resources
$kubectl api-versions
$kubectl explain services --recursive    Get keys each API version supports
$kubectl explain services.spec           Get subkeys of spec
$kubectl explain services.spec.type      Drilling down to type key with values of ClusterIP, NodePort etc.
```

```yaml
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  spec:
    selector:
      matchLabels:                      Glue telling the kind which pods are theirs
        app: nginx
    replicas: 2
    template:
      metadata:                         kubectl explain deployment.spec.template.metadata
        labels:
          app: nginx:
      spec:
        containers:
          name: nginx
          image: nginx:1.17.3
          ports:
            containerPort: 80
---                                         # separation between manifests
apiVersion: apps/v2
```
