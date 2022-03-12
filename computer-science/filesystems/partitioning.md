### Partitioning

Storage devices must be partitioned and formatted before first use. Refers to splitting a storage device into several logical regions so they can be managed separately as if they are separate storage devices. Partitioning is done by disk management tool provided by OS. Reason is so that whole storage space is not managed as a single unit and for a single purpose. Keeps critical system files apart from ordinary ones.

OS continuously use various memory management techniques to ensure every process has enough memory space to run. Computer with multiple partitions allows you to install several OS and hence, can choose different OS to boot up with. Recovery and diagnostic utilities reside in dedicated partitions.

#### Linux Partitions

1. OS.
2. User's files.
3. Swap partition (works as RAM extension if it runs out of space).

### Partitioning Schemes

Two partitioning schemes available for storage devices:

1. Master Boot Record (MBR) Scheme
2. GUID Partition Table (GPT) Scheme

#### MBR Partitioning and BIOS

BIOS firmware starts and loads boot loader program (contained in MBR) onto memory. Once the program is on the memory, CPU begins executing it. Having boot loader and partition table in predefined location like MBR enables BIOS to boot up the system without having to deal with any file.

MBR is simple and widely supported, but its data structure limits the number of partitions to four primary partitions. Also, each partition can have maximum of 2 TB, and content of MBR sector has no backup.

#### GPT Partitioning and UEFI

Can have as many partitions as OS allows, and every partition can be the size of biggest storage device available in market. In this partitoning scheme, first sector of storage device (Protective MBR) is reserved for compatibility reasons with BIOS-based systems as some systems might use BIOS firmware but with GPT partitioned storage device. After first sector, GPT data structures are stored, including GPT header and partition entries which are backed up at end of storage device (Secondary GPT) in the event the primary files get corrupted.

All booting services (boot loaders, boot managers, pre-os environments, shells) live in dedicated partition called EFI system Partition (ESP). Has its own file system which is a specific version of FAT.

```console
$ cd /sys/firmware/efi
$ sudo parted -l
```

### Formatting Partitions

When partitioning is done, partitions should be formatted. Formatting involves the creation of various data structures and metadata used to manage files within a partition. Most OS allows you to format a partition based on a set of file systems including FAT32, NTFS, APFS, Ext4, and etc.
