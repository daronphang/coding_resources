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

### Superuser

```
$whoami
$sudo                        Superuser do
$su <user>                   ctrl+D to logout of su
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
