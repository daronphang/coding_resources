## Docker Compose

Ideal for local development and testing but not production-grade tool. Can help us to overcome problem of maintaining multiple containers at once. Consists of YAML file. YAML file can be used with docker-compose for local docker automation or with docker directly in production with Swarm. DNS names for containers in compose file come from service name declared in .yml.

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

```yaml
services:
  network-example-service:
    image: karthequian/helloworld:latest
    ports:
      - "8080:3000" # port 8080 is exposed by host, port 3000 exposed by container
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
