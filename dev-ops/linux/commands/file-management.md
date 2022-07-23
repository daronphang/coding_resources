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

## Files

### Finding Files

```console
$ find . -name "*.log"
$ find /Path -name " file_name*"        Find all files in /Path with file_name*
$ find /Path/bar* -name "file_name*"    Find all files with pattern in bar* subdirectory
```

### Reading Files

'cat' allows us to create single or multiple files, view content of a file, concatenate files and redirect output in terminal or files.

'more' displays a file in the terminal, one page at a time if the text passed is too large to fit on one screen. 'Enter' key scrolls through the file line by line, while 'space' key scrolls one full screen at a time. File is closed by pressing 'q' key. Can only scroll down but not up.

However, after closing the file, its contents stay written in the terminal window. 'less' has the added benefit of not keeping the contents after the file is closed.

'less' also has support for different file formats including jar, war, zip, pdf, gif, png, etc i.e. reading metadata whereas 'more' would print binary data.

```console
$ cat filename          # Displays complete contents without using inputs to scroll through it
$ cat file1 file2
$ cat -n file           # view contents preceding with line numbers

$ cat testfile testfile1        Outputs contents of both files
$ cat /etc/file1
$ $cat >test2                    Creates a file
$ cat -n song.txt               Displays line numbers of file

$ head filename
$ tail filename
$ tail filename -n3     # -n flag outputs the number of lines to display

$ more filename
$ less filename

$ tac filename          # reverses order, starts from last line
$ tac filename | less
```

### Creating Files

```console
$ cat > newfile         # creates a new file called newfile
$ cat copied-file > destination-file    # copying content

$ touch /path/to/file filename.txt
```
