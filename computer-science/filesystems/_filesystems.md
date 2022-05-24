## Filesystems

A file system defines how files are named, stored and retrieved from a storage device. Everytime a file is opened, downloaded, copied, edited, or deleted, OS uses its file system internally to load it from storage device. File system handles space management, metadata, data encryption, file access control, and data integrity.

## Types of FileSystems

Type of file system differs by OS and needs of OS. Each file system has its own logical structures and properties such as speed and size.

## Windows

### FAT

Supported by Windows, FAT is considered simple and reliable, and is modeled after legacy file systems. However, cannot match with performance and scalability of modern file systems. FAT data structure is a table which stores information about which clusters are used, free or possibly unusable.

### exFAT

A lighter version of NTFS created by Microsoft in 2006. Designed for high-capacity removable devices such as external hard disks, USB drives, and memory cards. Has read and write support on Non-Windows environments including MacOS and Linux; hence, is the best cross-platform file system.

### NTFS

Default file system for Windows products. Improvements from previous FAT include better metadata support, performance and use of disk space.

## Linux (ext2, ext3, ext4, msdos, vfat, cramfs)

Supports reading over 100 partition types to allow for compatibility and interoperability with other computer's filesystems.

### GFS (Global File System)

File system for Linux and is a shared disk file system. Has the ability to make multiple computers to act as an integrated machine. When two computers are not able to send files directly with each other, GFS makes them capable of sharing a group of files directly. Maintained by Red Hat.

## Apple

### HFS

Hierachical file system.

### APFS

Apple File System.

## Architecture

File system installed on OS consists of three layers:

- Physical File System
- Virtual File System
- Logical File System

Can be implemented as independent or tightly coupled abstractions. Although layers are different across OS, concept is the same.

### PFS

Concrete implementation of file system. Responsible for data storage, retrieval and space management on storage device (partitions). PFS interacts with storage hardware via device drivers.

### VFS

Provides a consistent view or standard interface of various file systmes mounted on the same OS. OS can use multiple file systems at the same time i.e. Windows use NTFS while flash memory uses exFAT/FAT32. OS should provide a unified interface between computer programs (file explorers) and different mounted file systems (NTFS, APFS, ex4, FAT32, exFAT, UDF). Hence, you can copy files from ext4 file system to exFAT flash memory without having to know that files are managed differently under the hood. This convenient layer between user and underlying file systems is provided by VDS. Nonetheless, computer programs don't interact with VFS directly but use a unified API called Logical File System between programs and VFS i.e. VFS provides a bridge between LFS and PFS.

### LFS

LFS is the user-facing part of file system, which provides an API to enable user programs to perform various file operations such as READ, OPEN and WRITE without having to deal with any storage hardware.

## Directories

A directory/folder is a special file used as a logical container to group files and directories within a file system. On NTFS and Ext4, directories and files are treated the same way. Files are not literally contained within the directory, but are associated with the directory in a way that they appear as directory's children at higher level.

## File Mananger Programs

File system's API providing READ, WRITE, DELETE and EXECUTE operations is a low-level mechanism designed for computer programs, runtime environments and shells i.e. not for daily use. Nonetheless, OS provide file management utilities for day-to-day file management such as File Explorer (Windows), Finder (Mac OS) and Nautilus (Ubuntu).

## Maintaining Data Integrity

In older file systems like FAT32 or Ext2 partially writing new data to blocks would eventually corrupt the existing data i.e. when system crashes while writing. For modern file systems like NTFS, APFS and Ext4, this is less likely to happen as they use a technique called **journaling**.

Journaling file systems record every operation that's about to happen in the physical layer but hasn't happened yet. Main purpose is to keep track of changes that haven't yet been committed to the file system physically.

Journal is a special allocation on the disk where each writing attempt is first stored as a transaction. Once the data is physically placed on storage device, the change is committed to the file system. In the event of a system failure, file system will detect the incomplete transaction and rollback.
