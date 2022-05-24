### Linux

Both /media and /mnt should not contain any data but serve as temporary mount points.

| Directory | Description                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /         | Root filesystem (top-level directory). Must contain all of the files required to boot the Linux system before other file systems are mounted.                                                     |
| /bin      | Contains user executable files.                                                                                                                                                                   |
| /boot     | Contains static bootloader, kernel executable, and configuration files required to boot a Linux OS.                                                                                               |
| /dev      | Contains device files for every hardware device attached to the system. They are not device drivers, but files that represent each device on the computer and facilitate access to those devices. |
| /etc      | Contains local system configuration files for the host computer.                                                                                                                                  |
| /home     | Home directory storage for user files. Each user has a subdirectory in /home.                                                                                                                     |
| /lib      | Contains shared library files that are required to boot the system.                                                                                                                               |
| /opt      | Optional files such as vendor supplied application programs should be located here.                                                                                                               |
| /root     | Home directory for the root user.                                                                                                                                                                 |
| /sbin     | Contains system binary files that are executables used for system administration.                                                                                                                 |
| /tmp      | Temporary directory used by the OS and programs. Files stored here may be deleted at any time without prior notice.                                                                               |
| /usr      | Contains shareable, read-only files, including executable binaries and libraries, and other types of documentation.                                                                               |
| /var      | Variable data files are stored here such as log files, MySQL, database files, web server data files, and etc.                                                                                     |
| /media    | A place to mount external removable media services such as USB thumb drives.                                                                                                                      |
| /mnt      | A temporary mountpoint for regular filesystems (not removable media) that can be used while the administrator is repairing or working on a filesystem.                                            |
