# Images:
Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries, metadata and settings. Container images become containers at runtime. Not a complete OS i.e. no kernel, drivers, etc. For containers using the same image, they are stacked ontop of same image i.e. image is only stored once on host.

```
docker pull nginx                   Download latest version
docker pull nginx1.11

docker images -a                            List images
docker image rm <image_name>                Delete a specific image
docker rmi $(docker images -a -q)           Delete all images
docker images -f dangling=true              Filters images that have no relationship with tagged images
docker images -a |  grep "pattern"
```

## Building Images:
Order is critical. Keep things that do not change at top. Can add .dockerignore file. Need to disable builtkit if have error.

```
docker build .                    Builds an image from a dockerfile and context; run by Docker daemon and not CLI
docker build -f path/to/file
docker build -t test-image:1.1    Specify repo (test-image) and tag (1.1)

docker images                   
docker container run --name test_name -p 8080:80 -d test-image:1.1
docker container inspect test_name

docker build --build-arg http_proxy=http://10.239.4.80:913 --build-arg https_proxy=http://10.239.4.80:913 .
```

```
# error
failed to create LLB definition: failed to authorize: rpc error: code = Unknown desc = failed to fetch anonymous token

# linux
export DOCKER_BUILDKIT=0
export COMPOSE_DOCKER_CLI_BUILD=0

# windows
"buildkit": false         Found in docker engine settings
```

## Parser Directives:
Must be at top of dockerfile. Affects the way in which subsequent lines are handled and do not add layers to build. Can only be used once. supports syntax and escape.

```
Escape: \ or `
#directive=value1
FROM imageName
```

## Instructions for Dockerfile:

```
FROM          Sets base/parent image (must start with FROM)
COPY          Copies files from <src> to path <dest> of container, can be file or folder name
RUN           Default is run in shell /bin/sh -c; need to change on Windows
ARG           Instructions support variables, referenced with ${var} or $var, may precede FROM
CMD           Runs after container is created
LABEL         Adds metadata to an image, key-value pair
EXPOSE        Assumes TCP by default; informs Docker that container listens on specified network ports at runtime
ENV           Environment variables, key-value pairs
ADD           Copies new files, directories or URLs from <src> and adds them to filesystem of image at path <dest>
ENTRYPOINT    Allows to configure container that will run as an executable
VOLUME        Creates a mount point and marks it as holding externally mounted volumes
USER          Sets username or usergroup when running the image
WORKDIR       Sets working directory for any RUN, CMD, ENTRYPOINT, COPY, ADD

```

## Best Practices:
- WORKDIR should always use absolute paths.
- ENV persists when container starts running; viewed using docker inspect, changed using docker run --env key=value.
- ARG is passed at build-time but is not available after image is created (ENTRYPOINT, CMD).
- Use ARG for build-time customization as ENV will persist when a container starts running.
- Dockerfile should have either CMD or ENTRYPOINT commands; ENTRYPOINT followed by CMD.
- CMD is to provide default args for an ENTRYPOINT command or for executing an ad-hoc command in container.
- Don't install unnecessary packages.
- COPY is preferred over ADD as it is more transparent.
- Don't need virtualenv as Docker achieves the same isolation.
- For Windows, don't use backslash in WORKDIR, and not allowed in COPY.

## Running Flask App:
Example of Flask setup needed. Need exact map flask port to container port. To view page, enter localhost:8000 in browser.
```python
# need specify host and port (optional, default is 5000)
# 0.0.0.0 is wildcard IP address that matches any possible incoming port on host machine
# localhost port inside docker container does not actually get exposed on host machine
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5555)  # port defined is container port
```
```
docker build -t <image_name> .
docker container run -p 8000:5555 -d <image_name>
```

## Dockerfile example:
```
# syntax=docker/dockerfile:1
ARG  CODE_VERSION=3.7
FROM python:${CODE_VERSION}-alpine                              
WORKDIR /code
LABEL "com.example.vendor"="ACME Incorporated"
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers   
COPY requirements.txt requirements.txt             
RUN pip install -r requirements.txt                 # RUN ["cmd", "/S", "/C"] for Windows
EXPOSE 5000
COPY . .
CMD ["flask", "run"]                                
```
```
ARG PYTHON_VERSION=3.7
FROM python:3.7-alpine
ARG PATH=c:/Users/daronphang/my_assistant/container/
ENV FLASK_APP authentication_test_api.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8888
COPY . ${PATH}                                      # copies all files in cwd to container directory
WORKDIR ${PATH}
RUN apk add python-pip                              # apk for alpine, apt for ubuntu
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8888                                         # for documentation only
CMD ["flask", "run"]                                # CMD ["python", "test.py"]
```



