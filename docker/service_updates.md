## Service Updates:
Will replace containers for most changes. Includes rollback and healthcheck options.

```
// examples:
docker service update --image myapp:1.2.1 <servicename>                   Updating image
docker service update --env-add NODE_ENV=production --publish-rm 8080     Adding env variable and remove port
docker service scale web=8 api=6                                          Change number of replicas of two services
docker stack deploy -c file.yml <stackname>                               Updating stack file
```
