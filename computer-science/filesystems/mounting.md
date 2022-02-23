### Mounting File System

On Unix-OS, the VFS assigns a device ID (dev/disk1s1) to each partition or removable storage device. The contents of each device are then placed in a virtual directory tree as separate directories The act of assigning a directory to a storage device (under root directory tree) is called **mouting**, adn the assigned directory is called a **mount point**.

#### Linux

All partitions and removable storage devices appear as if they are directories under root directory.

```
/media
```

#### Manual Mounting

Mount-point (/media) should already exist as a directory, else need to be created first. If mount-point already contains files, they will be hidden so long the device is mounted.

```
mkdir -p /media/usb
mount /dev/disk1s1 /media/usb
```
