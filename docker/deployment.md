## Deploying HTML Site with Docker and Nginx:
1. Create directory for website with HTML files included.
2. Create a dockerfile in the same directory that builds a docker image.

```
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
```


3. Place either content in dockerfile for web server.

``` 
FROM nginx:alpine
COPY . /usr/share/nginx/html         Copying contents in current directory . into the container

FROM apache
COPY . /var/www/html
```
4. Build docker image for HTML server.

```
docker build -t html-server-image:v1
```

5. Run docker container.

```
docker run -d -p 80:80 html-server-image:v1
```
6. Test port with cURL.

```
curl localhost:80
```
