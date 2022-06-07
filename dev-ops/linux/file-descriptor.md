## File Descriptor

A unique non-negative number that identifies an open file in a computer's OS. It describes a data resource, and how that resource may be accessed. At least one file descriptor exists for every opened file on the system.

When a program asks to open a file or data resource like sockets, the kernel:

1. Grants access.
2. Creates an entry in the global file table.
3. Provides the software with the location of that entry (file descriptor).

### Defaults

```
0       STDIN
1       STDOUT
2       STDERR
```

### Increasing Number of File Descriptors

```console
$ ulimit -n
$ vi /etc/security/limits.conf
```

```conf
root soft nofile 65536
root hard nofile 65536
* soft nofile 65536
* hard nofile 65536
```

### Redirecting File Descriptors

When using 'find' command, successful output goes to STDOUT and error goes to STDERR. You can hide STDERR by redirecting STDERR to /dev/null, the special device that "goes nowhere".

```console
$ find / -name "hello" 2>/dev/null
$ find / -name '*something*' 2>&1 | grep 'something'
```
