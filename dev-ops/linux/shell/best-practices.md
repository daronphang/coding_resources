## Running Sudo Commands

Instead of running sudo inside shell scripts, run the script itself with sudo. All commands within the script will be run with root privileges and only need to give password once when launching the script.

### secure_path

Sudo only recognizes and runs commands that exist in directories specified in the secure_path in /etc/sudoers. When sudo is executed, $PATH is replaced with secure_path. To fix, need add directory in secure_path.

However, this introduces a security flaw that allows an attacker to run malicious programs if he manages to gain access to an unsecure directory that has been added to secure_path. Preferably, can provide the absolute path while running it with sudo.

```console
$ sudo visudo
$ sudo myscript.sh

$ sudo cp $(which my-command) /usr/bin  # copies exc to path that root user can access
```

```console
$ chmod u+x filename
$ sudo ./filename.sh
```
