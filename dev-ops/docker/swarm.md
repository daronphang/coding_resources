## Swarm

Clustering service solution built inside Docker. Consists of Manager Node and Worker Node. Docker service replaces docker run. IP address of manager must be assigned to a network interface available to host OS; all nodes in swarm must connect to the manager at same IP. Services can be attached to multiple Docker networks, and network can have many containers. Managers can behave as Workers i.e. run containers themselves.

Docker service is a cluster management command and must be executed on a swarm manager node. Docker service create is used to create instances/tasks of that service running in a cluster/swarm of nodes i.e. manage a group of containers from the same image.

```
$docker swarm init
$docker service create alpine        Spits out service ID instead of container ID
$docker service ls
$docker service update               Offers more features than container update
$docker service scale <number>       Update service and scale up to multiple containers
$docker node ps
$docker node ls
$docker service ps <service name>

$docker-machine ls                   Get IP address
$docker-machine ip <machine_name>

$docker node update --role manager node2
$docker swarm join <SSH key & IP>      Add to other worker nodes to join to swarm
$docker swarm join-token manager       Add response to other worker nodes to make them manager by default
```

## RAFT Consensus Algorithm

Consensus is a fundamental problem in fault-tolerant distributed systems involving multiple servers agreeing on values. Consensus algorithms make progress when any majority of servers is available i.e. cluster of 5 servers can operate with 2 failures. Tolerates up to (n-1)/2 failures.

Manager nodes implement this algorithm to manage global cluster state to ensure all Managers are storing the same consistent state. Having same consistent state across cluster means in failure, any Manager node can pick up tasks and restore services to stable state.

## Overlay Multi-Host Networking

Default network driver for Swarm. Creates a Swarm-wide bridge network where containers across hosts on the same virtual network can access each other. For intra-swarm communication. All nodes will have access to virtual IP that is mapped to the DNS name of the service. Has built-in load balancer that will distribute incoming network connections evenly.

```
$docker network create --driver overlay mydrupal
$docker service create --name psql --network mydrupal -e POSTGRES_PASSWORD=mypassword postgres
$docker service create --name drupal --network mydrupal -p 8080:80 drupal
```

## Routing Mesh

Routes incoming packets for a service to proper Task. Spans all nodes in Swarm. Works in two ways:

1. Container-to-container in an overlay network which uses virtual IP (routed over VIP).
2. External traffic incoming to published ports (all nodes will have published port open and listening).

When deploying containers to Swarm, don't have to care which server it is on as it might change. Allows one service to be accessible from any nodes in the Swarm. Takes packets from server, routes over VIP to the container. If a service is run on host port:8080 on container port:80 nginx from node1, any node connected in swarm can visit the nginx page on port:8080.

## Stacks

New layer of abstraction to Swarm. Stacks accept Compose files as their declarative definition for services, overlay networks and volumes. When using deploy in Compose file, cannot use build. Does not need docker-compose cli on the Swarm server.

```
$docker stack deploy -c example-voting.yml voteapp         c for compose
$docker stack services voteapp
$docker stack ps voteapp
$docker network ls
```

### Stack Secrets

Secrets Storage is the easiest 'secure' solution for storing secrets in Swarm. Secrets include username, passwords, SSH keys, etc. Doesn't require apps to be rewritten. Stored on disk on Manager nodes. Only containers in assigned services can see them.

```
$/run/secrets/<secret_name_or_alias>
$docker secret create psql_user psql_user.txt
$docker service create --name psql --secret psql_user --secret psql_pass -e POSTGRES_NAME_FILE=/run/secrets/$psql_name
$docker service update --secret-rm     // will recreate container, not ideal for database

# secrets in stacks
$docker stack deploy -c docker-compose.yml mydb      Secrets defined in Compose file
```

```
# using secrets in local docker compose
$docker-compose exec psql cat /run/secrets/psql_user
```

## Service Updates

Will replace containers for most changes. Includes rollback and healthcheck options.

```
$docker service update --image myapp:1.2.1 <servicename>                   Updating image
$docker service update --env-add NODE_ENV=production --publish-rm 8080     Adding env variable and remove $port
$docker service scale web=8 api=6                                          Change number of replicas of two $services
$docker service update --publish-rm 8080 --publish-add 9090:80
$docker stack deploy -c file.yml <stackname>                               Updating stack file

# to even resources out among nodes i.e. rebalancing
$docker service update --force web                                         Force update without changing $service
```
