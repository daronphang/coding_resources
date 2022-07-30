## Shell Scripting

Open-source computer program designed to be run by Unix shell.

## Shell vs Kernel

Shell is an interface between a user and an OS service. Shell provides users with an interface and accepts human-readable commands as input into the system and executes those commands which can run automatically and give the progrma's output in a shell script.

Kernel is at the nucleus of a computer. It makes the communication between hardware and software possible. Kernel is the innermost part of an OS, while Shell is the outermost.

## Shell Types

### Bourne Shell

- Prompt is $.
- POSIX/Korn shell is also known as sh.
- Bourne Again SHell is known as BASH.

### C Shell

- Prompt is %.
- C Shel is also known as csh.
- Tops C shell is also known as tcsh.

## Writing Shell Scripts

'#!' is an operator called shebang which directs the script to the absolute path of the bash interpreter location i.e. '#! /bin/sh' directs script to the bourne-shell.

```sh
which bash  # find bash interpreter

#! /bin/sh
ls
```

### Running Scripts

```console
$ ./script-name.sh
$ sh script-name.sh
$ bash script-name.sh
```

### Shell Variables

As general rule, use quotes if the variable can either be empty or contain spaces.

```sh
#! /bin/sh
variable ="Hello"
variable2 = 3
echo $variable
echo "$variable"
echo `variable`     # all 3 forms work

var=$((3+9))
echo $var
```

### Passing Commands

In Bash, there are reserved variables which we can use to recall user-defined arguments i.e. $1, $2, $3. $0 cannot be used as it references your Bash script itself.

```console
$ sh some_script.sh apple orange pear
```

```sh
echo "The first fruit is: $1"
echo "The second fruit is: $2"
echo "The third fruit is: $3"
```

### Read User Input

Read command looks for space or tab separator in input text in order to split the text into multiple values.

Can use silent flag '-s' to hide input characters from screen i.e. password.

```sh
echo "what is your name?"
read first
echo "How do you do, $first?"
read second
echo "I am $second too!"

read -p "Enter your age" variable_name    # -p flag to prompt user with a custom msg

echo -n "Please state your name and your surname: "
read name surname
```

```sh
#!/bin/bash

VAR1="Mihalis"  # assignment
myVar="$(pwd)"  # output of external program

echo -n "My name is ${VAR1}"  # -n prevents echo from printing a newline character
echo " and I work from "
echo $myVar

myVar=`pwd` # equivalent to $(pwd)
echo $myVar
```

### Using UNIX Environment Variables

```sh
#!/bin/bash

# Read
if [[ -z "${PATH}" ]]; then # -z flag tests whether a variable has length of 0
    echo "PATH is empty!"
else
    echo "PATH: $PATH"
fi

# Change
PATH=${PATH}:/tmp
echo "PATH: $PATH"

# Delete
export PATH=""    # export creates an env variable i.e. global
if [[ -z "${PATH}" ]]; then
    echo "PATH is empty!"
else
    echo "PATH: $PATH"
fi

# Create
MYPATH="/bin:/sbin:/usr/bin"
echo "MYPATH: ${MYPATH}"
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

To use mathematical conditionl operators like ==, <, need use '/bin/bash'.

```
-eq     Equality (==)
-ge     Greater than or equal
-gt     Greater than
-le     Less than or equal
-lt     Less than
-ne     Not equal
```

### Conditions

Use '-a' and '-o' for AND and OR comparisons.

In an if statement, grep returns exit 0 (true) if it found something, and otherwise exit 1 (false).

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

$ words="foo bar baz"
for word in $words; do
  echo "$word"
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
