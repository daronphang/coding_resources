### Disk Fragmentation

When a file is written to a disk, they are allocated one or more blocks depending on its size. One block is the minimum space that can be allocated to a file i.e. remaining space of partially-filled block cannot be used by another file.

Over time, new files are written to disk and existing files get bigger/shrunk/deleted. These frequent changes in storage medium leave many small gaps (empty spaces) between files. This is because file size and file size on disk are different.

File fragmentation occurs when a file is stored as fragments on storage device as the file system cannot find enough contiguous blocks to store the whole file in a row. For instance, when an existing file gets added, the new data may need to be assigned to new blocks as the subsequent block may be occupied by another file. Hence, the entire file won't be stored in contiguous blocks but as fragmented blocks.

File fragmentation puts constraint on file system as it needs to collect every piece of file from various locations on a disk every time it is requested.

### Modern File Systems

Modern file systems use smart algorithms to avoid/early-detect fragmentation as much as possible. Ext4 also does some sort of preallocation, which involves reserving blocks for a file before they are actually needed, making sure the file won't get fragmented if it gets bigger over time.

#### Delayed Allocation

Ext4 uses delayed allocation technique whereby instead of writing to data blocks one at a time during WRITE operation, the allocation requests are accumulated in a buffer and are then written to the disk once buffer is full. Additionally, not having to call the file system's block allocator on every WRITE request helps the file system make better choices with distributing the available space.
