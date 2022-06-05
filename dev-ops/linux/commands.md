## Important

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

## LS

List files or directories (similarly to file explorer) from CLI.

```console
$ ls [flags] [directory]
$ ls            Current working directory
$ ls /          Root directory
$ ls *          Subdirectories
$ ls -R          Recursive i.e. list all files with corresponding subdirectories down to last file
$ ls -l         Table format (permissions, owner, size, last modified date, file name)
$ ls -lh        Table format with readable file sizes
$ ls -a         All files including hidden file (starts with .)
$ ls -a -lh
$ ls -S         Sort by
```

## Directories

```console
$ pwd        Present working directory
$ mkdir -p test1/test2/test3              Creates parent directory 'test1' if doesn't exist
```

## File Permissions

### Ownership

For numeric IDs that exist as username, it should be prefixed with the + symbol. 

- USER: If only user is specified, specified user will become the owner of files.
- USER: User will become owner of files and file group ownership is changed to user.
- USER:GROUP: user and group will be changed by specified users.
- :GROUP: Only group ownership of files is changed.
- : : if only colon is given, no change is made.

```console
$ ls -l filename.txt                      Find out who owns a file and what group it belongs to

$ chown [OPTIONS] USER[:GROUP] FILE(s)    Changing onwership of file
$ chown -R USER:GROUP DIRECTORY           Recursive, changes ownership of all files and subdirectories
```

### Mode

Dictates what the user/group that owns a file can do with it i.e. read, write, execute. 

```
$ ls -l filename
# -rw-rw-rw- 1 cooluser cooluser 0 Jun 7 19:47 learningnotes.txt

1   File type, '-' for regular, 'd' for directories, 'l' for symlinks
2   Permissions, user-group-all users and groups
3   Number of links to the file
4   User that owns the file
5   Group that owns the file
6   Size of file in bytes
7   Date and time that the file was created or last modified
8   Filename
```

```
1     Execute
2     Write
4     Read
```

```
# total of 3 parameters

---       No permission
-x        Execute only
-w-       Write only
r--       Read only
-wx       Write and execute
r-x       Read and execute
rwx       Read, write and execute
```

```
u     User that owns the file
g     Group that owns the file
o     All other users and groups
a     All users and groups
r     Read permission
w     Write permission
x     Execute permission
-     Remove permission
+     Add permission
=     Make permissions exact
```

```console
$ chmod 400 learningnotes.txt       # user has read access
$ chmod 600 learningnotes.txt       # user has read and write
$ chmod 664 learningnotes.txt       # user and group has read+write, others have read-only

$ chmod [uago][+-=][rwx] filename
$ chmod o+w learningnotes.txt
```


## Files

### Finding

```console
$ find . -name "*.log" 
$ find /Path -name " file_name*"        Find all files in /Path with file_name*
$ find /Path/bar* -name "file_name*"    Find all files with pattern in bar* subdirectory
```

### Reading

'cat' allows us to create single or multiple files, view content of a file, concatenate files and redirect output in terminal or files.

'more' displays a file in the terminal, one page at a time if the text passed is too large to fit on one screen. 'Enter' key scrolls through the file line by line, while 'space' key scrolls one full screen at a time. File is closed by pressing 'q' key. Can only scroll down but not up. 

However, after closing the file, its contents stay written in the terminal window. 'less' has the added benefit of not keeping the contents after the file is closed. 
'less' also has support for different file formats including jar, war, zip, pdf, gif, png, etc i.e. reading metadata whereas 'more' would print binary data.


```console
$ cat filename          # Displays complete contents without using inputs to scroll through it
$ cat file1 file2
$ cat -n file           # view contents preceding with line numbers

$ head filename
$ tail filename
$ tail filename -n3     # -n flag outputs the number of lines to display

$ more filename
$ less filename

$ tac filename          # reverses order, starts from last line
$ tac filename | less
```

### Creating

```console
$ cat > newfile
$ cat copied-file > destination-file
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

## Grep (Global Regular Expression Print)

Grep utilities are a family that includes grep, egrep, and fgrep for searching files.

```console
$ grep 'word' filename
$ grep -i 'bar' file1         Perform case-insensitive search
$ grep -R 'httpd'             Look for all files in current directory and subdirectories
$ grep -c 'hello' file1       Search and display total number of times word appears
$ grep 'word' *               Search all files in current directory
$ grep 'str1\|str2' file1
$ grep -nr word ~/            

$ grep 'redeem reward' ~/*.txt      
$ tail -f /var/log/file.log | grep search_ter
```
```
-c          This prints only a count of the lines that match a pattern
-h          Display the matched lines, but do not display the filenames
-i          Ignores, case for matching
-l          Displays list of a filenames only
-n          Display the matched lines and their line numbers
-v          This prints out all the lines that do not matches the pattern
-e exp      Specifies expression with this option. Can use multiple times
-f          file Takes patterns from file, one per line
-E          Treats pattern as an extended regular expression (ERE)
-w          Match whole word
-o          Print only the matched parts of a matching line
-A n        Prints searched line and nlines after the result
-B n        Prints searched line and n line before the result
-C n        Prints searched line and n lines after before the result
-r          Recursively search subdirectories listed
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
