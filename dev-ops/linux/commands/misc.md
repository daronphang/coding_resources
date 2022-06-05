### References

```
~/        Refers to current user's home directory i.e. /home/daronphang or /root if root user
ctrl+L    Clear terminal
```

### Pipe Operator

Lets you use two or more commands such that the output of one command serves as input to the next.

```console
$ cat filename | less
$ cat sample | grep Apple
```

## Substitute User

Elevate privileges assigned to the current user. Both su and sudo are used to run commands with root permissions. Root user is equivalent to administrator user on Windows.

For su, it switches you to the root user account and prompts for the root account's password. On the other hand, sudo runs a single command with root privileges and prompts for current user's password before running command as the root user.

```console
$ whoami
$ sudo
$ su <user>                   ctrl+D to logout of su or type 'exit'
$ sudo apt update             Updates packages but does not install them
$ sudo apt upgrade
```

## Echo

Used to display line of text to screen/file. Typically used in scripting language and batch files.

```console
$ echo [option] [string(s)]
$ echo "hello world!"
$ echo -e "hello \bworld"    e flag acts as an interpretor of escaped characters
```

## Process Status

Used to get more detailed information about a specific process/processes i.e. check if a process is running or not.

"ps aux" is most frequently used command by Linux admin. Prints all running processes in system regardless from where they have been executed. A process is associated with any program running on your system, and is used to manage and monitor a program's memory usage, processor time, and I/O resources.

```
USER        User account under which this process is running
PID         Process ID
%CPU        CPU time used by this process
%MEM        Physical memory used by this process
VSZ         Virtual memory
RSS         Resident set size i.e. non-swappable physical memory
TTY         Terminal from which this process is started
STAT        Process state
START       Starting time
TIME        Total CPU time used by this process
```

```console
$ ps          Displays info about processes that are bound by the controlling terminal
$ ps aux      Displays the most amount of info a user usually needs to understand current state
$ ps -A       Prints all running processes (summarized)
$ ps -AF      Prints full format
$ ps x
$ ps -He

$ ps aux --sort -%mem
$ ps aux --sort=-%mem
$ ps aux | sort -nk +4 | tail -n 10      Sort by 4th field (%MEM), show last 10 lines
$ ps aux --sort -rss | head
```

## CPU Load

```
$ cat /proc/stat
```

## Aliases

Can create aliases for most used commands. Custom shortcuts used to represent a command or set of commands executed with or without custom options. Can create temporary (available for current terminal session) or permanent.

```console
$ alias BYCPU='ps aux --sort -%cpu' 
```

To keep aliases permanently, can save them in your user's shell configuration profile file.

```
~/.bashrc
~/.zshrc
~/.config/fish/config.fish

$ source ~/.bashrc
```
