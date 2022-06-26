## References

```
~/        Refers to current user's home directory i.e. /home/daronphang or /root if root user
ctrl+L    Clear terminal
```

## Installing Packages

```console
# update fetches latest versions for packages installed on system
# upgrade performs the updates
$ sudo apt update && apt upgrade
```

## Pipe Operator

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

## Hard/Soft Links

Link command creates a **'hard'** link named FILE2, which shares the same index node as existing file FILE1. Both share the same index node and hence, point to the same data on the disk. Modifying one is functionally the same as modifying the other.

```console
$ echo "This is a file." > FILE1.txt
$ link FILE1.txt FILE2.txt
$ cat FILE1.txt     # same as cat FILE2.txt
```

### Symlinks

**'Soft'** symbolic linnks are different than 'hard' links; they link to another link instead of linking to the data of a file.

'ln' by default creates a hard link, but has the option of creating symbolic links with -s. Symlinks can link to directories, cross file system boundaries, and are useful to make shortcuts to long, complicated filenames.

Removing the file that a symlink points to breaks the link.

```console
$ ln FILE1.txt FILE2.txt
$ ln -s FILE1.txt FILE2.txt

$ ln -s documents/ dox-sym-link
$ ls documents
$ ls dox-sym-link
```

## Hostname

Used to view and change a system's domain and hostname. Can be confiured to be descriptive or structured i.e. [purpose]-[number]-[environment].

```
-a      Display alias
-A      Display every FQDN (Fully Qualified Domain Name) of the computer
-b      Always set a hostname
-d      Display DNS
-f      Display the FQDN
-F      Check a file to recover and display the hostname
-i      Display IP address
-I      Display all of the computer's network addresses
-s      Display short version of the hostname
-v      Verbose
-y      Display NIS domain name
```

### Updating Hosts File

Hosts file creates static associations between IP addresses and hostnames/domains which the system prioritizes before DNS for name resolution.

```console
$ vi /etc/hosts
```

```
# example-hostname is the local hostname
# hostname.example.com is the FQDN

127.0.0.1 localhost.localdomain localhost
203.0.113.10 example-hostname.example.com example-hostname
2600:3c01::a123:b456:c789:d012 example-hostname.example.com example-hostname    # for IPv6
```
