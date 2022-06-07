## Managing Services

### init

The 'init' daemon is the first process executed by the Linux kernel ad its PID is always 1. If unable to start, system will 'Kernel Panic'. Created in the 1980s. Its purpose is to initialize, manage and track system services and daemons. Starts serially and results in delayed and longer booting time.

To create a service, you will need to write a script and store it in /etc/init.d directory.

```console
$ sudo sservice <command> <service-name>
$ sudo /etc/init.d/<service-name> <command>     # same
```

```sh
#!/bin/bash
# chkconfig: 2345 20 80
# description: Description comes here....

# Source function library.
. /etc/init.d/functions

start() {
    # TODO: code to start app comes here
}

stop() {
    # TODO: code to stop app comes here
}

case "$1" in
    start)
       start
       ;;
    stop)
       stop
       ;;
    restart)
       stop
       start
       ;;
    status)
       # TODO: code to check status of app comes here
       ;;
    *)
       echo "Usage: $0 {start|stop|restart|status}"
esac

exit 0
```

### systemd (system daemon)

Systemd is an init daemon used by modern systems and starts system services in parallel which removes unnecessary delays and speeds up the initialization process.

To create a service, you need to write .service file and store it in /etc/systemd/system directory.

```console
$ sudo systemctl <command> <service-name>
```
