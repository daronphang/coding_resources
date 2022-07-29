## Networking

Docker containers and services can be connected with each other, or to non-Docker workloads. They can be managed in platform-agnostic way i.e. doesn't matter if Docker hosts run Linux, Windows or mix.

By default, when a container is created and run, it does not publsih any of its ports to the outside world. To make a port available to services outside of Docker or to Docker containers, need to use --publish flag. This creates a firewall rule which maps a container port to a port on the Docker host to the outside world.

```
bridge              Communication between containers running on same Docker host
overlay             Communication between containers running on different Docker hosts
```

```console
$ docker container run -p 8080:80   # map TCP port 80 in container to port 8080 of host machine
$ docker network ls
```

### IP Address and Hostname

By default, the container is assigned an IP address for every Docker network it connects to. When the container starts, it can only be connected to a single network using --network. However, you can connect a running container to multiple networks.

```console
$ docker container run --network --ip   # ip to specify the IP address

$ docker network connect --ip   # to connect a running container to other networks
```

### Accessing Containers within Docker Compose Network

**When one container calls another directly**, use the Compose service name and the default port.

**When the browser application calls a container**, use the host's DNS name (localhost if local) and the container's port. For instance, when running a dockerized React/Angular, it is running in the user's browser which is outside of Docker's space and hence, doesn't has access to Docker's internal networking.
