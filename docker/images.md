# Images:
Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries, metadata and settings. Container images become containers at runtime. Not a complete OS i.e. no kernel, drivers, etc.

For containers using the same image, they are stacked ontop of same image i.e. image is only stored once on host.

```
docker pull nginx                   Download latest version
docker pull nginx1.11
```

## Building Images:
Order is critical. Keep things that do not change at top.

## Instructions for Dockerfile:
```
ARG           Instructions support variables, referenced with ${variable_name}
FROM          Sets base image
COPY          Copies files from <src> to path <dest>
RUN           Two forms, <command> and ["executable", "param1", "param2"]
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

## Dockerfile example:
```
# syntax=docker/dockerfile:1
FROM python:3.7-alpine                              
WORKDIR /code
LABEL "com.example.vendor"="ACME Incorporated"
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt             
RUN pip install -r requirements.txt                 
EXPOSE 5000
COPY . .
CMD ["flask", "run"]                                
```
