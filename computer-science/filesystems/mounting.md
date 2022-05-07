### Mounting in File System

On Unix-OS, the VFS assigns a device ID (dev/disk1s1) to each partition or removable storage device. The contents of each device are then placed in a virtual directory tree as separate directories.

Before you can access the files on a file system (hard drive partition, CD-ROM, floppy, USB device), the file system needs to be mounted first. Mounting a file system attaches that file system to a directory (**mount point**) and makes it available to the system i.e. refers to the grouping of files in a file system structure accessible to the user. The root file system (/) is always mounted. Any other file system can be connected/disconnected from the root file system.

When a file system is mounted, any files or directories in the underlying mount point directory are unavailable as long as the file system is mounted.

Mounting may be local or remote. In local, it connects the disk drivers as one machine. while remote uses NFS (Network File System) to connect to directories on other machines so that they can be used as if they are part of the user's file system.

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
