## Networking

Each container is connected to a private virtual network called the 'bridge' (default network driver). Each virtual network routes through NAT firewall on host IP. All containers on a virtual network can talk to each other without -p. Each app with frontend/backend should sit on the same network. Can attach containers to more than one virtual network.

https://docs.docker.com/desktop/windows/networking/

### Network Driver

Built-in or third-party extensions that give virtual network features.

### Bridge

Network driver that allows containers to communicate with each other running on same docker host.

### Pinging from Windows host to container

Can either use publish feature to enable port-forwarding in Docker.

### Network Commands

```console
$ docker container run -d -p 80:80 --name webhost --network my_app_net nginx
$ docker container port webhost
$ docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
$ docker container inspect bridge

$ docker network ls
$ docket network create --driver
$ docker network connect/disconnect     Connect an existing container to new network

```

### DNS

Static IP's for talking to containers is an anti-pattern and avoid it as this requires updating the application configuration frequently and makes the app fragile. Instead, use DNS naming (host name). Docker daemon has built-in DNS server that containers use by default.

https://www.joyent.com/blog/container-native-discovery
