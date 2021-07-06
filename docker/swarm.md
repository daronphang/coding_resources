## Swarm:
Clustering service solution built inside Docker. Consists of Manager Node and Worker Node. Docker service replaces docker run. IP address of manager must be assigned to a network interface available to host OS; all nodes in swarm must connect to the manager at same IP.

```
docker swarm init
docker service create alpine        Spits out service ID instead of container ID
docker service ls
docker service update               Offers more features than container update
docker service scale <number>       Update service and scale up to multiple containers
docker node ps
docker node ls
docker service ps <service name>

docker-machine ls                   Get IP address
docker-machine ip <machine_name>

docker node update --role manager node2
docker swarm join <SSH key & IP>      Add to other worker nodes to join to swarm
docker swarm join-token manager       Add response to other worker nodes to make them manager by default
```
## Overlay Multi-Host Networking:
Creates a Swarm-wide bridge network where containers across hosts on the same virtual network can access each other. For intra-swarm communication.
```
--driver overlay      
docker network create --driver overlay mydrupal
docker service create --name psql --network mydrupal -e POSTGRES_PASSWORD=mypassword postgres
```
