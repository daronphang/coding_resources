## Containers: 
Processes that run inside host OS and are not mini-VMs. Containers can be listening on same port without conflicts if they are published on different host ports i.e. 80:80 or 8080:80.

```
docker container top          Process list in one container
docker container inspect      Details of one container config
docker container stats        Performance stats for all containers
docker container run -it      Start new container interactively
docker container exec -it     Run additional process in existing container
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
