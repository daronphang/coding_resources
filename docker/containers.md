## Containers: 
Processes that run inside host OS and are not mini-VMs. Containers can be listening on same port without conflicts if they are published on different host ports i.e. 80:80 or 8080:80.

```
docker container <some command> --help
docker container top          Process list in one container
docker container inspect      Details of one container config
docker container stats        Performance stats for all containers

// get shell inside containers
docker container run -it --name proxy nginx bash
docker container run -it                     Start new container with interactive shell (with command 'exit' to close)
docker container exec -it <container> sh     Run additional process in existing container
docker container start -ai 
```

## Image vs Container:
- Image is the application to run i.e. Nginx web server.
- Container is an instance of that image running as a process.
- Can have many containers running off the same image.
- Docker's default image 'registry/repository' is called Docker Hub.

```
docker container run --publish 8080:80 --detach <specify_name> nginx
docker container run -d --name nginx1 nginx
docker container run -d --name mysql -e MYSQL_RANDOM_ROOT_PASSWORD=true mysql

1. Downloaded image 'nginx' from Docker Hub (if cannot find image locally).
2. Started a new container from that image.
3. Opened port 8080 on host IP.
4. Routes that traffic to container IP, port 80.
5. Detach is to run server in background, gives unique container ID.

docker container start (to start an existing stopped one)
docker container stop 690 (type in first few digits of UID)
docker container ls -a
docker container logs specify_name
docker container rm -f specify_name (to force stop and remove container)
```

## Linux Distributions for Container Images:
Alpine, Ubuntu.

## Network:
Each container is connected to a private virtual network called 'bridge'. Each virtual network routes through NAT firewall on host IP. All containers on a virtual network can talk to each other without -p. Each app with frontend/backend should sit on the same network. Can attach containers to more than one virtual network.

Terminologies:
- Network Driver: Built-in or third-party extensions that give virtual network features.
- Bridge: Network driver that allows containers to communicate with each other running on same docker host.

``` 
docker container run -d -p 80:80 --name webhost --network my_app_net nginx
docker container port webhost
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
docker container inspect bridge

docker network ls
docket network create --driver
docker network connect/disconnect     Connect an existing container to new network

```
### DNS:
Static IP's for talking to containers is an anti-pattern and avoid it. Use DNS naming (host name). Docker daemon has built-in DNS server that containers use by default.
