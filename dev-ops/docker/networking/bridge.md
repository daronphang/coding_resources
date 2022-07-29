## Bridge

The default network driver that Docker creates. Bridge networks are usually used when your applications run in standalone containers that need to communicate.

In Docker, a bridge network uses a software bridge which allows containers connected to the same bridge network to communicate, while providing isolation from containers which are not connected to that bridge network.

Bridge networks apply to containers running on the same Docker daemon host.

```console
$ docker network inspect bridge     # ip address of gateway between Docker host and bridge network
```

## User-Defined Bridge

Can create user-defined custom bridge networks which are superior to default bridge network.

```console
$ docker network create my-net
$ docker network rm my-net

# creates a new container from an existing image without starting it
$ docker create --name my-nginx \
    --network my-net \
    --publish 8080:80 \
    nginx:latest

$ docker network connect my-net my-nginx
$ docker network disconnect my-net my-nginx
```

### Enable Forwarding

By default, traffic from containers connected to the default bridge network is not forwarded to the outside world. To enable forwarding, need to change settings in Docker's host kernel.

```console
# configure Linux kernel
$ sysctl net.ipv4.conf.all.forwarding=1

# configure iptables
$ sudo iptables -P FORWARD ACCEPT
```

## Default vs User-Defined

| Feature                           | Default                                                                                                                                                         | User-Defined                                                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| DNS resolution between containers | Can only access each other by IP addresses                                                                                                                      | Provides automatic DNS resolution. Can resolve each other by name or alias i.e. http://reactapp:8080/home                             |
| Isolation                         | All containers without --network specified are attached to the default bridge network which can be a risk as unrelated services can communicate with each other | Provides a scoped network                                                                                                             |
| Attach/Detach                     | Need to stop the container and recreate it with different network options                                                                                       | Can connect/disconnect on the fly                                                                                                     |
| Configuration                     | All containers use the same settings such as MTU and iptables rules, and requires restart of Docker                                                             | Can be configured using "docker network create" separately                                                                            |
| Environment variables             | Linked containers using --link share environment variables                                                                                                      | Not possible, but can be shared using Docker Compose, or by mounting a file/directory containing the shared information to containers |
