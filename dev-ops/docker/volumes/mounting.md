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

Mount volume on running container directly, dns flag might not be required.

```console
$ docker run --dns 172.25.241.102 -v C:\Users\daronphang\Downloads:/data --privileged -it pee_df_adhoc_requests /bin/bash

$ apt install cifs-utils  # if cannot, download directly from host and mount host folder to container

$ mount //remote_ip_add /data -t cifs -o username=daronphang,password=somepassword,file_mode=0777,dir_mode=0777,uid=1000,gid=1000,cache=strict
```
