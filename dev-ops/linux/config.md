## Drivers

```console
$ sudo ubuntu-drivers autoinstall

$ sudo lspci -v      View all drivers installed
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
sudo apt install speedtest-cli
$ speedtest
``` 

## Creation

```console
$ touch file1.txt
```