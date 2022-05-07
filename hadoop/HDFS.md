### HDFS

HDFS is the primary data storage system used by Hadoop applications i.e. provides for the storage of Hadoop.
HDFS enables the rapid transfer of data between compute nodes. Closely coupled with MapReduce whereby it breaks the information down into separate blocks and distribute them to different nodes in a cluster.

HDFS is designed to be fault-tolerant by replicating each piece of data multiple times and distributes the copies to individual nodes, placing at least one copy on a different server rack than the other copies. Runs on commodity hardware. With HDFS, data is written once on the server and susbsequently read and reused multiple times thereafter.

HDFS supports a traditional hierarchical file organization. Clients can create directories and then store files inside these directories.

### How HDFS Works (Architecture)

Employs a master/slave architecture with NameNode and multiple DataNodes running on a commodity hardware cluster. Data is then broken down into blocks that are distributed across various data nodes for storage.

### Data Block Splitting

Each block has the same size of 128MB except the last block.

### Data Replication

Based on the cluster's configuration, NameNode creates a number of copies of each data block using the replication method. Default setting is to have three replicas. This redundancy offers higher availability when a server fails, and higher scalability as different nodes can access different parts of the data process it in parallel efficiently.

### NameNode

A master server that manages the file system namespace and regulates access to files by clients. Keeps track of the metadata of each data block and its replicas including filename, permission, ID, location, and number of replicas. Does not store the data contained in these files.

When the client applications want to add/copy/move/delete a file, they interact with NameNode. Responds to the request by returning a list of relevant DataNode servers where the data lives. NameNode records any change to the file system namespace or its properties in transaction logs called EditLogs.

Hadoop 2.x introduced the possibility of having multiple NameNodes per rack as having a single pose a great vulnerability. Usual cluster consists of an active NameNode and a stand-by NameNode that maintains a merged copy of EditLog if there is a need for failover (ensures high availability).

### DataNode

Slave daemon that stores data blocks assigned by the NameNode. Responsible for serving read and write requests from the file system's clients. Performs block creation, deletion, and replication upon instruction from the ClientNode after interaction with the NameNode. When operation is sucessful, an acknowledgement will be sent from DataNode back to the NameNode through the ClientNode for recording logs.

DataNodes are kept in constant communication with the NameNode to determine if the DataNodes are needed to complete specific tasks. If the NameNode realizes that one DataNode is not working, it can reassign the task to another node containing the same data block. DataNodes also communicate with each other during normal file operations (writing) to replicate blocks across multiple nodes.

## HDFS Goals

### Fast recovery from hardware failures

As one HDFS instance may consist of thousands of servers, failure of at least one is inevitable. HDFS has been built to detect faults and automatically recover quickly.

### Access to streaming data

HDFS is intended more for batch processing versus interactive use, hence the emphasis in the design is for high data throughput rates.

### Accomodation of large data sets

HDFS accommodates applications that have data sets between gigabytes to terabytes in size. HDFS provides high aggregate data bandwidth and can scale to hundreds of nodes in a single cluster.

### Portability

HDFS is designed to be portable across multiple hardware platforms and to be compatible with a variety of underlying OS.

## Using HDFS

- UI (Ambari)
- CLI (Putty for Windows)
- HTTP/HDFS proxies
- Java interface
- NFS gateway
