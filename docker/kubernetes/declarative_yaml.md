## YAML:
Each file can contain more than one manifest. Each manifest describes an API object (deployment, job, secret) and requires four parts:
1) apiVersion
2) knd
3) metadata
4) spec

```
kubectl apply -f filename.yml           Create/update resources in a file
kubectl apply -f myyaml/                Create/update whole directory of yaml

```

```
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  spec:
    selector:
      matchLabels:
        app: nginx
    replicas: 2
    template:
      metadata:
        labels:
          app: nginx:
      spec:
        containers:
          name: nginx
          image: nginx:1.17.3
          ports:
            containerPort: 80
```
