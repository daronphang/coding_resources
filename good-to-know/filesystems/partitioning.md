### Partitioning

Storage devices must be partitioned and formatted before first use. Refers to splitting a storage device into several logical regions so they can be managed separately as if they are separate storage devices. Partitioning is done by disk management tool provided by OS. Reason is so that whole storage space is not managed as a single unit and for a single purpose. Keeps critical system files apart from ordinary ones.

OS continuously use various memory management techniques to ensure every process has enough memory space to run. Computer with multiple partitions allows you to install several OS and hence, can choose different OS to boot up with. Recovery and diagnostic utilities reside in dedicated partitions.

#### Linux Partitions
1) OS.
2) User's files.
3) Swap partition (works as RAM extension if it runs out of space).


### Partitioning Schemes

Two partitioning schemes available for storage devices:
1) Master Boot Record (MBR) Scheme
2) GUID Partition Table (GPT) Scheme



### System Firmware

Firmware is a low-level software embedded into electronic devices to operate the device, or bootstrap another program to do it. Uses data structures to boot up OS on a partition.
