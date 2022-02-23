### Metadata

File metadata is a data structure that contains data about a file including file size, timestamps, ownership, file's mode, etc. They are stored in a different place on the disk but not with file content.

### Linux

Metadata exist as inode which contains:

- Unique number (inode number).
- Association with files through inode tables.
- Address of blocks allocated to the file i.e. where the file is located.

How file opening works:

- Name of file is first resolved to an inode number.
- File system fetches respective inode from inode table with inode number.
- File system starts to compose the file from data blocks registered in inode.

To see inodes in partitions, can use below command which returns total, used and free. Number of inodes is decided when the partition is formatted.

```console
$ df -i

udev           4116100    378 4115722    1% /dev
tmpfs          4118422    528 4117894    1% /run
/dev/vda1      6451200 175101 6276099    3% /
```

### NTFS

NTFS keeps file information in a data structure called Master File Table (MFT). Every file has at least one entry in MFT.
