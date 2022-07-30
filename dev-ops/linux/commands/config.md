## Installing Files

```console
$ sudo dpkg -i package_file.deb     # for ubuntu debian, to install dependencies automatically
```

## Distro Version/Architecture

```console
$ cat /etc/os-release
$ lsb_release -a

$ uname -m  # x86_64

$ dpkg --print-architecture     # amd64
```

## Drivers

```console
$ sudo ubuntu-drivers autoinstall

$ sudo lspci -v      View all drivers installed

$sudo dkms status            Get drivers from dynamic kernel module support
```

## Display

Xrandr is a utility for monitor management.

```console
$ xrandr -q
$ xrandr --output DVI-D-0 --mode 1920x1080      Output targets monitor, mode tells which resolution
$ xrandr --output DVI-D-0 --mode 1920x1080 --rate 60.00
```

## Network

```console
$ ifconfig                    Show network interface such as IP address
$ curl ifconfig.me
$ ip address show

sudo apt install speedtest-cli
$ speedtest
```

## Creation

```console
$ touch file1.txt
```

## Logs

```console
$ tail -f /var/log/syslog
```

## Checking Disk Space

```console
$ df -h /data     # h is short for human-readable
$ df -h -total    # see total disk space available
```
