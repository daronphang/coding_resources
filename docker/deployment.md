## Deploying HTML Site with Docker and Nginx:
1. Create directory for website with HTML files included.
2. Create a dockerfile in the same directory.

``` 
FROM nginx:alpine
COPY ./usr/share/nginx/html

FROM apache
COPY . /var/www/html
```
3. Build docker image for HTML server.

```
docker build -t html-server-image:v1
```

4. Run docker container.

```
docker run -d -p 80:80 html-server-image:v1
```
5. Test port with cURL.

```
curl localhost:80
```
