## Swarm:
Clustering service solution built inside Docker. Consists of Manager Node and Worker Node. Docker service replaces docker run. IP address of manager must be assigned to a network interface available to host OS; all nodes in swarm must connect to the manager at same IP. Services can be attached to multiple Docker networks, and network can have many containers.

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
Creates a Swarm-wide bridge network where containers across hosts on the same virtual network can access each other. For intra-swarm communication. All nodes will have access to virtual IP that is mapped to the DNS name of the service. Has built-in load balancer that will distribute incoming network connections evenly.
```
--driver overlay      
docker network create --driver overlay mydrupal
docker service create --name psql --network mydrupal -e POSTGRES_PASSWORD=mypassword postgres
docker service create --name drupal --network mydrupal -p 8080:80 drupal
```

## Routing Mesh:
Routes incoming packets for a service to proper Task. Spans all nodes in Swarm. Works in two ways:
1) Container-to-container in an overlay network which uses virtual IP (routed over VIP).
2) External traffic incoming to published ports (all nodes will have published port open and listening).

When deploying containers to Swarm, don't have to care which server it is on as it might change. Allows one service to be accessible from any nodes in the Swarm. Takes packets from server, routes over VIP to the container. If a service is run on host port:8080 on container port:80 nginx from node1, any node connected in swarm can visit the nginx page on port:8080.
