## Check File/Folder Permissions

```console
$ ls -l filename

$ ls -ld /data    # d flag for directory and not contents
$ ls -ld /data | head
```

## Folder Ownership

```console
$ls -la
```


## File Ownership

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

## File Mode

Dictates what the user/group that owns a file can do with it i.e. read, write, execute. 

```
$ ls -l filename
# -rw-rw-rw- 1 cooluser cooluser 0 Jun 7 19:47 learningnotes.txt

1   File type, '-' for regular, 'd' for directories, 'l' for symlinks
2   Permissions, (user)-(group)-(all other users and groups)
3   Number of links to the file
4   User that owns the file
5   Group that owns the file
6   Size of file in bytes
7   Date and time that the file was created or last modified
8   Filename
```

### Absolute Mode

```
0       No permission
1       Execute
2       Write
3       Execute + write
4       Read
5       Read + execute
6       Read + write
7       Read + write + execute
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

```console
$ chmod 400 learningnotes.txt       # user has read access
$ chmod 600 learningnotes.txt       # user has read and write
$ chmod 664 learningnotes.txt       # user and group has read+write, others have read-only
```

### Symbolic Method

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

### Example

```console
$ chmod [uago][+-=][rwx] filename
$ chmod o+w learningnotes.txt
$ chmod go-rw myfile
```
