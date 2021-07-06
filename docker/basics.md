# Docker:
Allows users to create independent and isolated environments (called containers) to launch and deploy applications. Not a virtual machine as it
only shares resources of host machine in order to run its environments (does not include complete OS). Benefits of Docker:
- Can be built and destroyed faster than VM.
- Multi-platform i.e. can launch containers on any system on Mac, PC, Linux.
- Each environment is isolated.
- Reduces complexity and maintenance as backend, frontend, db, queues are packaged in containers.

```
docker --help
docker version
docker info
docker top moongo
ps aux | grep mongo                         Grep is a filtering tool
docker                                      Shows list of commands
docker image 1s                             List images
docker image rm [image name]                Delete a specific image
docker image rm $(docker images -a -q)      Delete existing images
docker ps -a                                List all existing containers, running and not running (process status), same as ls
docker stop [container name]                Stop container
docker stop $(docker ps -a -q)              Stop all containers
docker rm [container name]                  Delete specific container
docker rm $(docker ps -a -q)                Delete all containers
docker logs [container name]
```

## File Directory:
Ensure codes that are going to be used inside containers are placed in /Users.

## GUI:
Can use Cmder. Runs PowerShell, CMD Prompt or Bash. Before unzipping, make sure to unblock the folder. To tell Docker how to find server in Cmder:
```
docker-machine env default
```

## Docker on Linux:
Easiest OS to use Docker. Install Linux VM on Windows. Can either install with script, store or docker-machine. Can use Ubuntu or CentOS. Need to also install Docker Machine and Docker Compose.
```
curl -sSL https://get.docker.com/ | sh
```


