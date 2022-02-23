### Filesystem

A file system defines how files are named, stored and retrieved from a storage device. Everytime a file is opened/downloaded/copied/edited/deleted, OS uses its file system internally to load it from storage device. File system handles space management, metadata, data encryption, file access control, and data integrity.

### Architecture

File system installed on OS consists of three layers:
- Physical File System
- Virtual File System
- Logical File System

 Can be implemented as independent or tightly coupled abstractions. Although layers are different across OS, concept is the same.
 
#### PFS

Concrete implementation of file system. Responsible for data storage, retrieval and space management on storage device (partitions). PFS interacts with storage hardware via device drivers. 

#### VFS

Provides a consistent view of various file systmes mounted on the same OS. OS can use multiple file systems at the same time i.e. Windows use NTFS while flash memory uses exFAT/FAT32. OS should provide a unified interface between computer programs (file explorers) and different mounted file systems (NTFS, APFS, ex4, FAT32, exFAT, UDF). Hence, you can copy files from ext4 file system to exFAT flash memory. This convenient layer between user and underlying file system



### OS

### Algorithm

### Data Structure
