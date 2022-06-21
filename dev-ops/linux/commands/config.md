## Distro Version

```console
$ lsb_release -a
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
