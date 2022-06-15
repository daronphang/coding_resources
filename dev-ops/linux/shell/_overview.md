## Shell Scripting

Open-source computer program designed to be run by Unix shell.

## Shell vs Kernel

Shell is an interface between a user and an OS service. Shell provides users with an interface and accepts human-readable commands as input into the system and executes those commands which can run automatically and give the progrma's output in a shell script.

Kernel is at the nucleus of a computer. It makes the communication between hardware and software possible. Kernel is the innermost part of an OS, while Shell is the outermost.

## Shell Types

### Bourne Shell

-   Prompt is $.
-   POSIX/Korn shell is also known as sh.
-   Bourne Again SHell is known as BASH.

### C Shell

-   Prompt is %.
-   C Shel is also known as csh.
-   Tops C shell is also known as tcsh.

## Writing Shell Scripts

'#!' is an operator called shebang which directs the script to the absolute path of the bash interpreter location i.e. '#! /bin/sh' directs script to the bourne-shell.

```sh
which bash  # find bash interpreter

#! /bin/sh
ls
```

### Shell Variables

```sh
#! /bin/sh
variable ="Hello"
echo $variable

var=$((3+9))
echo $var
```

### Read User Input

Can use silent flag '-s' to hide input characters from screen i.e. password.

```sh
echo "what is your name?"
read first
echo "How do you do, $first?"
read second
echo "I am $second too!"

read -p "Enter your age" variable_name    # -p flag to prompt user with a custom msg
```

### Execution Rights

'chmod' modifies the existing rights of a file for a particular user.

```
r       Read
w       Write
x       Execute

rwx     Read/Write/Execute
```

```console
chmod daron+x hello_world.sh
```

### Arithmetic Operations

For decimal calculations, can use 'bc' command to get the output to a particular number of decimal places.

```sh
echo "scale=2;22/7" | bc    # 3.14
```

### Comparisons

```
-eq     Equality
-ge     Greater than or equal
-gt     Greater than
-le     Less than or equal
-lt     Less than
-ne     Not equal
```

### Conditions

Use '-a' and '-o' for AND and OR comparisons.

```sh
read x
read y

if [ $x -gt $y ]
then
echo X is greater than Y
elif [ $x -lt $y -a $x -lt 5 ]
then
echo X is less than Y
elif [ $x -eq $y ]
then
echo X is equal to Y
fi
```

### Looping

```sh
for i in {1..5}
do
    echo $i
done

for X in cyan magenta yellow
do
	echo $X
done
```

### While Loop

```sh
i=1
while [[ $i -le 10 ]] ; do
   echo "$i"
  (( i += 1 ))
done
```

### Reading Files

```sh
LINE=1

while read -r CURRENT_LINE
	do
		echo "$LINE: $CURRENT_LINE"
    ((LINE++))
done < "sample_file.txt"
```
