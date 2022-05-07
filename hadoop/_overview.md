## Hadoop

An open-source Java-based framework for reliable, scalable, distributed computing that allows you to efficiently store and process large datasets ranging from gigabytes to petabytes of data. Instead of using one large computer to store and process the data, Hadoop allows clustering multiple computers to analyze datasets in parallel more quickly (horizontal scaling). Hadoop can process structured and unstructured data and scale reliably from a single server to thousands of machines.

Don't have to worry about running Hadoop on one system or on multiple nodes of an entire cluster of computers as they are abstracted from Hadoop.

## How Hadoop Works

Hadoop makes it easier to use all the storage and processing capacity in cluster servers, and to execute distributed processes against huge amounts of data. Hadoop provides the building blocks on which other services and applications can be built.

- Applications that collect data in various formats can place data into the Hadoop cluster by using an API operation to connect to the NameNode.
- NameNode tracks the file directory structure and placement of "chunks" for each file, replicated across DataNodes.
- To run a job to query the data, provide a MapReduce job made up of many map and reduce tasks that run against the data in HDFS spread across nodes.
- Map tasks run on each node against the input files supplied.
- Reducer tasks run to aggregate and organize the final output.

## Benefits

### Ability to store and process large amounts of any kind of data quickly.

### Computing power

Distributed computing model processes big data fast, more nodes means more processing power.

### Fault tolerance (resilience)

HDFS is fundamentally resilient. Data and application processing are protected against hardware failure. If a node goes down, jobs are automatically rerouted to other nodes to make sure the distributed computing does not fail. Multiple copies of all data are stored automatically.

### Flexibility

Unlike traditional relational databases, you don't have to preprocess the data before storing it. You can store as much data as you want and decide how to use it later. Allows for storing of semi-structured or unstructured data including text, images, and videos.

### Low cost

Open-source framework is free and uses commodity hardware to store large quantities of data.

### Scalability

Unlike traditional systems that limit data storage, Hadoop is scalable as it operates in a distributed environment. Can easily grow your system to handle more data simply by adding more nodes.

## Challenges

### Complexity

Hadoop is a low-level, Java-based framework that can be overly complex and difficult for end-users to work with. Hadoop architectures can also require significant expertise and resources to setup, maintain and upgrade.

### Performance

Hadoop uses frequent reads and writes to disk to perform computations, which is time-consuming and inefficient compared to frameworks that aim to store and process data in memory as much as possible like Apache Spark.

### MapReduce programming is not a good match for all problems

MapReduce is good for simple information requests and problems can be divided into independent units, but it is not efficient for iterative and interactive analytic tasks as it is file-intensive.

### Data security

Fragmented data post security issues. Nonetheless, the Kerberos authentication protocol is a great step toward making Hadoop environments secure.

### Full-fledged data management and governance

Hadoop does not have easy-to-use, full-feature tools for data management, data quality, data standardization, data cleansing, governance and metadata.

## Tools

- VirtualBox for running Linux on Windows.
- Hortonworks Data Platform from Cloudera.
- groupslens.org for free movie data.
- Ambari Sandbox for Hadoop visualization on web browser (http:127.0.0.1:8888).
- Credentials are maria_dev and maria_dev.

## Setting Up Admin

To administer your cluster from Ambari, need to log in as Admin and not maria_dev.

```console
# Open a session to your cluster using Putty
$ su root
$ ambari-admin-password-reset
```
