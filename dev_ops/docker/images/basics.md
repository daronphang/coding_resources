## Images:
Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries, metadata and settings. Container images become containers at runtime. Not a complete OS i.e. no kernel, drivers, etc. For containers using the same image, they are stacked ontop of same image i.e. image is only stored once on host.

```
docker pull nginx                   Download latest version
docker pull nginx1.11

docker images -a                            List images
docker image rm <image_name>                Delete a specific image
docker rmi $(docker images -a -q)           Delete all images, need run inside Windows powershell
docker rmi $(docker images -q)          
docker images -f dangling=true              Filters images that have no relationship with tagged images
docker images -a |  grep "pattern"

docker image prune -a                       Removes all unused images, not just dangling ones
```

## Building Images:
Order is critical. Keep things that do not change at top. Can add .dockerignore file. Need to disable builtkit if have error. Don't need virtualenv as Docker achieves the same isolation.

Need to check which image is used to built from. 
```
alpine            Uses apk add
Ubuntu/Debian     Uses apt-get
```

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
# error: failed to create LLB definition: failed to authorize: rpc error: code = Unknown desc = failed to fetch anonymous token

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
Need to also create .dockerignore.

```
FROM          Sets base/parent image (must start with FROM)
COPY          Copies files from <src> to path <dest> of container, can be file or folder name
ADD           Copies new files, directories or URLs from <src> and adds them to filesystem of image at path <dest>
ENV           Environment variables available after built-time, key-value pairs
ARG           Instructions support variables, referenced with ${var} or $var, may precede FROM
RUN           Used for installing software packages; default is run in shell /bin/sh -c; need to change on Windows
ENTRYPOINT    Allows to configure container that will run as an executable
CMD           Runs after container is created; sets default command and/or parameters which can be overwritten
LABEL         Adds metadata to an image, key-value pair
EXPOSE        Assumes TCP by default; informs Docker that container listens on specified network ports at runtime
VOLUME        Creates a mount point and marks it as holding externally mounted volumes
USER          Sets username or usergroup when running the image
WORKDIR       Sets default working directory for any RUN, CMD, ENTRYPOINT, COPY, ADD


-ARG is passed at build-time but is not available after image is created (ENTRYPOINT, CMD)
-ENV can be changed using docker run --env key=value
```

### RUN vs CMD vs ENTRYPOINT:
- Dockerfile should have either CMD or ENTRYPOINT commands; ENTRYPOINT followed by CMD.
- ENTRYPOINT configures a container that will run as an executable; used for commands that always need to execute.
- CMD sets default command and/or parameters which can be overwritten from 'docker container run' command line.
- RUN is an image build step; triggered when we are building the docker image.

If have multiple CMD instructions, all but last CMD instructions are ignored.
All three can be specified in either Shell or Exec form.

### CMD & ENTRYPOINT:
```dockerfile
# CMD ["param1", "param2"]
ENTRYPOINT ["/bin/echo", "Hello"]
CMD ["world"]

# docker run -it <image>            # Hello world
# docker run -it <image> John       # Hello John
```

### RUN:
```dockerfile
# both update and install are executed in single RUN to ensure latest packages are installed
# if separated, apt-get install would reuse a layer added by apt-get update
RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \
  subversion
```

### Shell (use if need to run bash):
```dockerfile
# <instruction> <command>
# automatically calls /bin/sh -c <command>
RUN apt-get install python3
CMD echo "Hello world"
ENTRYPOINT echo "Hello world"
```
### Exec: 
```dockerfile
# <instruction> ["executable", "param1", "param2", ...]
RUN ["apt-get", "install", "python3"]
CMD ["/bin/echo", "Hello world"]
ENTRYPOINT ["/bin/echo", "Hello world"]
```

https://towardsdatascience.com/how-to-fix-modulenotfounderror-and-importerror-248ce5b69b1c

## Best Practices:
- WORKDIR should always use absolute paths.
- Use ARG for build-time customization as ENV will persist when a container starts running.
- COPY is preferred over ADD as it is more transparent.
- Don't install unnecessary packages.
- For Windows, don't use backslash in WORKDIR, and not allowed in COPY.
- Use explicit Docker base image tags (default is :latest) as they are inconsistent and exposed to vulnerabilities. 
- Containers run with root privileges by default (unrestricted management); however, exposes to high risk when running in production env as anyone who has access to container can inject malicious code or change user; always run containers as non-root.
- To increase Docker build performance, add dockerignore file.