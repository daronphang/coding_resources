## PATH

PATH is an environmental variable that tells the shell which directories to search for executable files in response to commands issued by a user. Increases both the convenience and the safety of such operating systems and is widely considered to be the single most important environmental variable.

When you type a command in Linux shell, it doesn't look in every directory to see if there's a program by that name; instead, it looks to the ones you specify.

```console
$ echo $PATH
```

### Setting PATH (temp)

```console
$ export PATH=$PATH:/place/with/the/file
```

### Setting PATH (persistent)

```console
$ vim $HOME/.profile
$ vim /etc/profile      # system-wide setting

# add this line in file
# export PATH=$PATH:/place/with/the/file

$ source $HOME/.profile     # to apply changes
```
