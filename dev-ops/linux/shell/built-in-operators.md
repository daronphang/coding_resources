## Built-in Operators

```
$@          Arguments provided in cli
$#          Number of arguments
$0          Name of script
$1          First argument value

$PATH
```

## Flags

Used in 'if' statement.

```sh
if [[ -e "$arg" ]]
    then
        echo -n "$arg exists "
    fi
```

```
-e      Check if exists
-f      Check if file exists
-z      Check if non-empty
-d      Check if directory
```
