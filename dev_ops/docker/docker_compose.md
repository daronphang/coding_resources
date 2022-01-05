### Docker Compose

Ideal for local development and testing but not production-grade tool. Consists of YAML file. YAML file can be used with docker-compose for local docker automation or with docker directly in production with Swarm. DNS names for containers in compose file come from service name declared in .yml.

For ENV configuration, can pass in .env file:

```yaml
web:
  env_file:
    - web-variables.env
```

https://docs.docker.com/compose/environment-variables/#the-env_file-configuration-option

```
$docker-compose up           Setup volumes/networks and start all containers
$docker-compose down         Stop all containers and remove volumes/networks

// if project has dockerfile and docker-compose.yml:
$git clone github.com/some/software
$docker-compose up
```

```yaml
version: "3.9" # optional since v1.27.0
services:
  web:
    build: . # to specify where dockerfile of image is supposed to build from
    ports:
      - "5000:5000"
    volumes:
      - .:/code
      - logvolume01:/var/log
    links:
      - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

### Example

```yaml
version: "3"
services:
  web:
    # Path to dockerfile.
    # '.' represents the current directory in which
    # docker-compose.yml is present.
    build: .

    # Mapping of container port to host

    ports:
      - "5000:5000"
    # Mount volume
    volumes:
      - "/usercode/:/code"

    # Link database container to app container
    # for reachability.
    links:
      - "database:backenddb"

  database:
    # image to fetch from docker hub
    image: mysql/mysql-server:5.7

    # Environment variables for startup script
    # container will use these variables
    # to start the container with these define variables.
    environment:
      - "MYSQL_ROOT_PASSWORD=root"
      - "MYSQL_USER=testuser"
      - "MYSQL_PASSWORD=admin123"
      - "MYSQL_DATABASE=backend"
    # Mount init.sql file to automatically run
    # and create tables for us.
    # everything in docker-entrypoint-initdb.d folder
    # is executed as soon as container is up nd running.
    volumes:
      - "/usercode/db/init.sql:/docker-entrypoint-initdb.d/init.sql"
```
