## Swarm:
Clustering service solution built inside Docker. Consists of Manager Node and Worker Node. Docker service replaces docker run.

```
docker swarm init
docker service create alpine        Spits out service ID instead of container ID
docker service ls
docker service update               Offers more features than container update
docker service scale <number>       Update service and scale up to multiple containers
docker node ps
docker node ls
docker service ps <service name>

docker node update --role manager node2
docker swarm join <SSH key & IP>      Add to other worker nodes to join to swarm
docker swarm join-token manager       Add response to other worker nodes to make them manager by default
```
