## Service Updates:
Will replace containers for most changes. Includes rollback and healthcheck options.

```
// examples:
docker service update --image myapp:1.2.1 <servicename>                   Updating image
docker service update --env-add NODE_ENV=production --publish-rm 8080     Adding env variable and remove port
docker service scale web=8 api=6                                          Change number of replicas of two services
docker service update --publish-rm 8080 --publish-add 9090:80
docker stack deploy -c file.yml <stackname>                               Updating stack file

// to even resources out among nodes i.e. rebalancing
docker service update --force web                                         Force update without changing service
```
