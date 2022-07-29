## Mounting Windows Path

```console
nslookup server_name
```

```
-v C:\path\to\my\host\folder:/data/path

-v //QNAP-NAS//Media//P2P//done//:/downloads
```

### Option One

For Windows network drives, need to create a volume first.

```console
$ docker volume create --driver local --opt type=cifs \
  --opt device=//networkdrive-ip/Folder --opt o=user=yourusername,\
  domain=yourdomain,password=yourpassword mydockervolume

$ docker run -v mydockervolume:/data alpine ls /data
```

### Option Two

```console

```
