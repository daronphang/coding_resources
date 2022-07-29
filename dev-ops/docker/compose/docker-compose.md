## Docker Compose

Ideal for local development and testing but not production-grade tool. Can help us to overcome problem of maintaining multiple containers at once. Consists of YAML file. YAML file can be used with docker-compose for local docker automation or with docker directly in production with Swarm. DNS names for containers in compose file come from service name declared in .yml.

https://docs.docker.com/compose/compose-file/compose-file-v3/

```console
$ docker-compose up       # for yaml files
$ docker-compose start    # for yml files

$ docker-compose stop     # stops active services, preserves containers/volumes/networks
docker-compose down       # stops all containers
```

## Services

Useful for splitting dockerized web application with FE, BE and DB. When building an image, can either use "image" or "build" tag. If "build" tag is omitted, the image is pulled from Docker Registry; else it will be the name of the image.

```yaml
services:
  frontend:
    image: my-vue-app           # name of image
    build: /path/to/dockerfile  # build an image from src code
    build: https://github.com/my-company/my-project.git

    ...
  backend:
    image: ubuntu:latest # pulling image from Docker Registry
    ...
  db:
    image: postgres
    ...
```

### Dependencies

Services get loaded before other ones. However, it will not wait for the service to finish loading (zookeeper) before starting (kafka). Instead, it will wait for it to start.

```yaml
services:
  kafka:
    image: wurstmeister/kafka:2.11-0.11.0.3
    depends_on:
      - zookeeper
```

## Volumes

A volume is a shared directory in the host that is visible from some/all containers. They are physical areas of disk space shared between the host and a container, or between containers themselves.

## Network

Network defines the communication rules between containers and the host. common zones will make containers' services discoverable by each other, while private will segregate them in virtual sandboxes.

Port declarations allows us to run different containers exposing the same ports without collisions.

When docker compose up, the following happens:

1. A network called [app_directory]\_default is created.
2. A container is created using the service's configuration. It joins the network under its name.

```yaml
services:
  network-example-service:
    image: karthequian/helloworld:latest
    ports:
      - "8080:3000" # port 8080 is exposed by host, port 3000 exposed by container
```

### Connecting between Containers

By default Compose sets up a single network for your app. Each container for a service joins the default network and is both reachable by other containers on that network, and discoverable by them at a hostname identical to the container name.

When making a request from one container to another, use service name instead of localhost:port i.e. axios.get('http://service1/api/status').

### Load Balancer

When having multiple services and using Docker to map unallocated ports for each service, we wouldn't know which port is being allocated for each container until all instances are up.

```yaml
services:
  service1:
    ports:
      - "5000" # expose 5000 of container to an ephermeral unallocated port on host machine
  service2:
    ports:
      - "5000"
```

```console
# show all ports mapped
$ docker ps
```

In order to access the services without knowing the specific ports, can use load balancer. The port specified will be resolved by Docker's embedded DNS server, which will use a round robin implementation to resolve the DNS requests based on the service name and distribute them to the Docker containers.

```conf
user  nginx;

events {
    worker_connections   1000;
}
http {
        server {
              listen 4000;
              location / {
                proxy_pass http://pspdfkit:5000;
              }
        }
}
```

```yaml
version: "3"

services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: pspdfkit
      POSTGRES_PASSWORD: password
      # ... other environment variables
  pspdfkit:
    image: "pspdfkit/pspdfkit:latest"

    environment:
      PGUSER: pspdfkit
      PGPASSWORD: password
      # ... other environment variables
    depends_on:
      - db
    expose:
      - "5000"
  nginx:
    image: nginx:latest
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - pspdfkit
    ports:
      - "4000:4000"
```

## ENV

For ENV configuration, can pass in .env file:

```yaml
services:
  some_service:
    image: "postgres:${POSTGRES_VERSION}"
    env_file:
      - web-variables.env
    environment:
      DB: mydb
      USER: "${USER}"
```

https://docs.docker.com/compose/environment-variables/#the-env_file-configuration-option
