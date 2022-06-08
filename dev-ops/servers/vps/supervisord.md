### Supervisord

In many VPS environments, it is often the case that you will have a number of small programs that you want to run persistently i.e. shell scripts, node.js apps, or any large-sized packages.

Usually, external packages are supplied with a unit file that allows them to be managed by an init system such as systemd, or packaged as docker images. However, for software that isn't well-packaged, or for users who prefer not to interact with low-level init system on the server, it is helpful to have a lightweight alternative. 

Supervisor is a process manager which provides a singular interface for managing and monitoring a number of long-running programs. Supervisord's primary purpose is to create and manage processes based on data in its configuration file. It does this by creating subprocesses. Each subprocess spawned by supervisor is managed for the entirety of its lifetime by supervisord (parent process). When a child dies, supervisor is notified of its death via SIGCHILD signal, and it performs the appropriate operation.

### Configuration File

```
autostart         Tells supervisor that this program should be started when system boots
autorestart       Always restart after exists if TRUE
stderr_logfile    Location of log files; specified directories MUST exist
```

```console
$ sudo nano /etc/supervisor/conf.d/idle.conf
$ sudo tail /var/log/idle.out.log
```

```conf
command=/home/ubuntu/idle.sh
autostart=true
autorestart=true
stderr_logfile=/var/log/idle.err.log
stdout_logfile=/var/log/idle.out.log
```
