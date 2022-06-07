## Running Sudo Commands

Instead of running sudo inside shell scripts, run the script itself with sudo. All commands within the script will be run with root privileges and only need to give password once when launching the script.

```console
$ sudo myscript.sh
```