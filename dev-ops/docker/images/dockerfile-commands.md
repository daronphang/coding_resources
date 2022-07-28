## Dockerfile Commands

Need to create .dockerignore file also.

For WORKDIR, can set as absolute (/path/to/workdir) or relative path (relative/path).

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


ARG is passed at build-time but is not available after image is created (ENTRYPOINT, CMD)
ENV can be changed using docker run --env key=value
```

### RUN vs CMD vs ENTRYPOINT

- Dockerfile should have either CMD or ENTRYPOINT commands; ENTRYPOINT followed by CMD.
- ENTRYPOINT configures a container that will run as an executable; used for commands that always need to execute.
- CMD sets default command and/or parameters which can be overwritten from 'docker container run' command line.
- RUN is an image build step; triggered when we are building the docker image.

If have multiple CMD instructions, all but last CMD instructions are ignored.
All three can be specified in either Shell or Exec form.

```dockerfile
# CMD ["param1", "param2"]
ENTRYPOINT ["/bin/echo", "Hello"]
CMD ["world"]

# docker run -it <image>            # Hello world
# docker run -it <image> John       # Hello John
```

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

### Running Multiple CMD Commands

Recommended is to use "sh" instead of "bash" as not all images provide bash shell.

```dockerfile
CMD ["sh", "-c", "cd src && python3 -m flask run"]
```
