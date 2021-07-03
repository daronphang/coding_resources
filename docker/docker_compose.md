## Docker Compose:
Ideal for local development and testing but not production-grade tool. Consists of YAML file. YAML file can be used with docker-compose for local docker automation or with docker directly in production with Swarm.

```
docker-compose up           Setup volumes/networks and start all containers
docker-compose down         Stop all containers and remove volumes/networks

// if project has dockerfile and docker-compose.yml:
git clone github.com/some/software
docker-compose up
```

```
version: "3.9"  # optional since v1.27.0
services:
  web:
    build: .
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
