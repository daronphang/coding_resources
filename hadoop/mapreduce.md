## Handling Failures

### Application master monitors worker tasks for errors or hanging

- Restarts as needed.
- Preferably on a different node.

### Application master goes down

- YARN can try to restart it.

### Entire node goes down

- Resource manager will try to restart it

### Resource manager goes down

- Can set up "high availability" using Zookeeper to have a hot standby.

## Applicability

MapReduce is superseded by technologies by Spark or other higher-level tools that lets you issue SQL queries to your cluster (Hive).
