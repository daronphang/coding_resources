## Deployment

1. Build image from dockerfile.
2. Run docker container.
3. Test port with curl.

```console
# cd to directory where dockerfile exists

$ docker build -t your_image_name .
$ docker run -d -p 80:80 your_image_name:v1
$ curl localhost:80
```

## Python

```dockerfile
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

```dockerfile
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

```dockerfile
ARG PYTHON_VERSION=3.7
FROM python:${PYTHON_VERSION}
ARG PATH /myassistant
ENV FLASK_APP ma.py
# ENV PYTHONPATH /myassistant       # if there are import issues, need specify PYTHONPATH
ENV FAB7SERVER SERVERNAME
ENV FAB7USERNAME USERNAME
ENV FAB7PASSWORD PASSWORD
ENV FAB7PORT 1234
COPY . /myassistant
WORKDIR /myassistant
RUN pip install --no-cache-dir -r requirements-docker.txt
EXPOSE 8888
CMD [ "flask", "run", "--host=0.0.0.0", "--port=8888"]
```

```py
import os

if os.environ['FAB7SERVER']:  # for ENV specified in Dockerfile
  print('hello')
```

### Flask

Example of Flask setup needed. Need exact map flask port to container port. To view page, enter localhost:8000 in browser. Need to ensure VENV folder is not together with Dockerfile.

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

## NodeJS

https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

```dockerfile
FROM node:10-alpine
# using non-root node user's home directory as working directory, and setting ownership on them for container
# official node image includes a least-privileged user of name "node"
# -p creates the directory and if required, all parent directories
# creating node_modules sub directory first which binds to "node" user instead of npm install creating sub folder for us
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Docker caches results of npm install and rerun if only the packaging files change
COPY --chown=node:node ["package.json", "package-lock.json*", "./"]
USER node
# ci --only=production for production build
RUN npm install
# 'production' for performance and security related optimizations
ENV NODE_ENV=development
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "app.js" ]
```

```
# .dockerignore
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
.npmrc
```
