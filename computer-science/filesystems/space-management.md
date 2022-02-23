### Space Management

Storage devices are divided into fixed-sized blocks called sectors. However, file systems use a high-level concept as storage unit, called blocks. Blocks are an abstraction over physical sectors, and each block usually consists of multiple sectors. Depending on the file size, file system allocates one or more blocks to each file. Contiguous blocks are grouped into block groups for easier management. Each block group has its own data structures and data blocks.

When files are being written to a disk, they are written to one or more blocks within a block group. Managing files at block group level improves performance of file system significantly, as opposed to organizing files as one unit.

### Block Group Data Structures

#### Super Block

A metadata repository which contains metadata about the entire file system.

#### Group Descriptors

Contain bookkeeping information for each block group.

#### Inode Bitmap

Inode quota for storing files.

#### Block Bitmap

A data structure used to identify used and unused data blocks. 1 denotes used and - denotes unused data blocks.

#### Inode Table

Data structure that defines the relation of files and their inodes. The number of inodes stored in this area is related to the block size used by file system.

#### Data Blocks

Zone within the block group where file contents are stored.
