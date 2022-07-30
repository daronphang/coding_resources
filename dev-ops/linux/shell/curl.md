## Curl

### Information

```console
$ curl -I ${url}    # get headers
```

### Downloading Files

```console
$ curl ${url} > outfile     # download file saving as outfile
$ curl ${url} -o outfile    # as option
```

## GET

### With HTTP Headers

```console
$ curl https://reqbin.com/echo
   -H "Cache-Control: must-revalidate"
   -H "Pragma: no-cache"
   -H "Expires: 0"
```

## POST Request

```console
$ curl -X POST [options] [url]

$ # multipart/form-data
$ curl -X POST -F 'name=linuxize' -F 'email=linuxize@example.com' https://example.com/contact.php

$ # application/x-www-form-urlencoded
$ curl -X POST -d 'name=linuxize' -d 'email=linuxize@example.com' https://example.com/contact.php

$ curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "linuxize", "email": "linuxize@example.com"}' \
    https://example/contact
```

### Uploading Files

```console
$ curl -X POST -F 'image=@/home/user/Pictures/wallpaper.jpg' http://example.com/upload
```
