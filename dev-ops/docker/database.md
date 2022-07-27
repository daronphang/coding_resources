## Creating Database Containers

When running applications in Docker that require database connection, need to create separate container for database (MySQL as example):

1. Create YAML file and run docker compose.
2. Connect to mysql client directly in Docker and update host for user 'root'.
3. Restart docker container.
4. Connect MySQL Workbench to database container.

```yaml
# MySQL database container
version: "3.0"
services:
  mysqldb:
    container_name: mysqldb
    image: mysql:5.7
    ports:
      - "30000:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root # use this password for establishing database connection
      MYSQL_DATABASE: stock_app_docker # Database name that is created
    volumes:
      - "./.data/db:/var/lib/mysql"
```

### Database connection in Docker

```console
$ docker container ls -a
$ docker exec -it <database_container_name> mysql -uroot -p
$ SHOW DATABASES;
$ UPDATE mysql.user SET host='%' WHERE user='root';
```

### Connecting to Same Network

https://docs.docker.com/compose/networking/

```
docker network inspect
```

```yaml
# Flask app example
# Flask container
version: "3.0"
services:
  web:
    container_name: stock_app_backend
    build: .
    ports:
      - "4280:4280"
    env_file:
      - .env
networks:
  default:
    external: true
    name: backend_default # Need to connect to same network as sql container
```
