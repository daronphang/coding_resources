### LS

List files or directories (similarly to file explorer) from CLI.

```
$ls [flags] [directory]
$ls         Current working directory
$ls /       Root directory
$ls *       Subdirectories
$ls -R      Recursive i.e. list all files with corresponding subdirectories down to last file
$ls -l      Table format (permissions, owner, size, last modified date, file name)
$ls -lh     Table format with readable file sizes
$ls -a      All files including hidden file (starts with .)
$ls -a -lh
$ls -S      Sort by
```

### Directories

```
$pwd        Present working directory
$mkdir -p test1/test2/test3              Creates parent directory 'test1' if doesn't exist
$chown [OPTIONS] USER[:GROUP] FILE(s)    Changing onwership of file
$chown -R USER:GROUP DIRECTORY           Recursive, changes ownership of all files and subdirectories
```

### Substitute User

Elevate privileges assigned to the current user. Both su and sudo are used to run commands with root permissions. Root user is equivalent to administrator user on Windows.

For su, it switches you to the root user account and prompts for the root account's password. On the other hand, sudo runs a single command with root privileges and prompts for current user's password before running command as the root user.

```
$whoami
$sudo
$su <user>                   ctrl+D to logout of su or type 'exit'
$sudo apt update             Updates packages but does not install them
$sudo apt upgrade
```

### Echo

Used to display line of text to screen/file. Typically used in scripting language and batch files.

```
$echo [option] [string(s)]
$echo "hello world!"
$echo -e "hello \bworld"    e flag acts as an interpretor of escaped characters
```

### Process Status

Used to get more detailed information about a specific process/processes i.e. check if a process is running or not.

"ps aux" is most frequently used command by Linux admin. Prints all running processes in system regardless from where they have been executed.

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

```
ps -A       Prints all running processes (summarized)
ps -AF      Prints full format

```

### Grep (Global Regular Expression Print)

Grep utilities are a family that includes grep, egrep, and fgrep for searching files.

```
grep 'word' filename
grep -i 'bar' file1         Perform case-insensitive search
grep -R 'httpd'             Look for all files in current directory and subdirectories
grep -c 'hello' file1       Search and display total number of times word appears
grep 'word' *               Search all files in current directory
grep 'str1\|str2' file1

tail -f /var/log/file.log | grep search_ter

-c          This prints only a count of the lines that match a pattern
-h          Display the matched lines, but do not display the filenames.
-i          Ignores, case for matching
-l          Displays list of a filenames only.
-n          Display the matched lines and their line numbers.
-v          This prints out all the lines that do not matches the pattern
-e exp      Specifies expression with this option. Can use multiple times.
-f          file Takes patterns from file, one per line.
-E          Treats pattern as an extended regular expression (ERE)
-w          Match whole word
-o          Print only the matched parts of a matching line
-A n        Prints searched line and nlines after the result.
-B n        Prints searched line and n line before the result.
-C n        Prints searched line and n lines after before the result.
```
