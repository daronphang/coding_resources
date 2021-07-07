# Images:
Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries, metadata and settings. Container images become containers at runtime. Not a complete OS i.e. no kernel, drivers, etc.

For containers using the same image, they are stacked ontop of same image i.e. image is only stored once on host.

```
docker pull nginx                   Download latest version
docker pull nginx1.11
```

## Building Images:
Order is critical. Keep things that do not change at top. Can add .dockerignore file. 

### Parser Directives:
Must be at top of dockerfile. Affects the way in which subsequent lines are handled and do not add layers to build. Can only be used once. supports syntax and escape.

```
Escape: \ or `

#directive=value1

FROM imageName
```

## Instructions for Dockerfile:
```
docker build .                    Builds an image from a dockerfile and context; run by Docker daemon and not CLI
docker build -f path/to/file
docker build -t test/myapp        Specify repo and tag at which to save new image if build succeeds
```

```
FROM          Sets base/parent image (must start with FROM)
COPY          Copies files from <src> to path <dest>, can be file or folder name
RUN           Two forms, <command> and ["executable", "param1", "param2"]
ARG           Instructions support variables, referenced with ${variable_name}, may precede FROM
CMD           Runs after container is created
LABEL         Adds metadata to an image, key-value pair
EXPOSE        Assumes TCP by default; informs Docker that container listens on specified network ports at runtime
ENV           Environment variables, key-value pairs, noted with ${var} or $var
ADD           Copies new files, directories or URLs from <src> and adds them to filesystem of image at path <dest>
ENTRYPOINT    Allows to configure container that will run as an executable
VOLUME        Creates a mount point and marks it as holding externally mounted volumes
USER          Sets username or usergroup when running the image
WORKDIR       Sets working directory for any RUN, CMD, ENTRYPOINT, COPY, ADD

# Tips:
Use ARG for build-time customization as ENV will persist when a container starts running
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
RUN pip install -r requirements.txt                 
EXPOSE 5000
COPY . .
CMD ["flask", "run"]                                
```
