### Supervisord

Supervisord's primary purpose is to create and manage processes based on data in its configuration file. It does this by creating subprocesses. Each subprocess spawned by supervisor is managed for the entirety of its lifetime by supervisord (parent process). When a child dies, supervisor is notified of its death via SIGCHILD signal, and it performs the appropriate operation.
