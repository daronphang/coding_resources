## Variable Typing

By changing '-' to '+', it makes the opposite of the option.

```
-a      Numeric array
-A      Associative array
-f      Function
-i      Treat as integer
-p      Displays the "declare" command used to declare the variable
-r      Marks the variable as "read only"
-t      Gives to the variable the trace attribute
-x      Exports the variable
```

```sh
declare option MyVariable=Value

declare +i -r MyVariable="I will do some math!: "
declare -i Number=1

echo $MyVariable $Number + $Number = $((Number + Number))
```

## Automation for Interactive Prompts

Can use tool 'Expect' or simply piping input with answers.

Alternative is to use cat and text file to pass along the input you need.

```sh
echo "Y Y N N Y N Y Y N" | ./your_script

yes [answer] |./your_script     # outputs 'y', an affirmative response
yes n | rm -i *.txt             # passing parameter n

cat "input.txt" | ./Script.sh
```

## CLI Arguments

```console
./cla.sh 1 2 3
```

```sh
#!/bin/bash

echo "Arguments: $@"
echo "Number of arguments: $#"

for arg in "$@"
do
    echo "$arg"
done

echo "The name of the script is: $0"
echo "The first argument is: $1"

if [ -x $0 ]
then
    echo "$0" file exists!
fi
```

```
Arguments: 1 2 3
Number of arguments: 3
1
2
3
The name of the script is: ./cla.sh
The first argument is: 1
./cla.sh file exists!
```

## Combining Commands in Bash Scripts

Wrap the commands in $() or backticks i.e. echo $(groups username).

```sh
if groups daronphang | grep -w -q "sudo"
then echo "yes"
else echo "n/a"
fi
```

```sh
#!/bin/bash

total=0
for n in ./*.sh
do
    ti=`grep while ${n} | wc -l`
    # wc is for word count
    ti=$(($ti + 0))
    if [[ $ti -gt 0 ]]
    then
        total=$(($total+$ti))
    fi
done

echo "Total:" $total
```

## Working with DateTime

```
Fri Aug 30 13:05:09 EST 2019
08-30-19
08-30-2019
13:05:09
01:05:09 PM
13:05
Friday 30 Aug 2019 13:05:09
Nanoseconds: 1567159562-373152585
Timezone: 06:05:09
Timezone: 10:05:09
1567159509
Week number: 35
-rw-r--r--  1 mtsouk  staff  0 Aug 30 13:05 1567159509
-rw-r--r--  1 mtsouk  wheel  0 Aug 30 13:05 /tmp/test.1567159509
```

```sh
#!/bin/bash

# Print default output
echo `date`

# Print current date without the time
echo `date +"%m-%d-%y"`

# Use 4 digits for year
echo `date +"%m-%d-%Y"`

# Display time only
echo `date +"%T"`

# Display 12 hour time
echo `date +"%r"`

# Time without seconds
echo `date +"%H:%M"`

# Print full date
echo `date +"%A %d %b %Y %H:%M:%S"`

# Nanoseconds
echo Nanoseconds: `date +"%s-%N"`

# Different timezone by name
echo Timezone: `TZ=":US/Eastern" date +"%T"`
echo Timezone: `TZ=":Europe/UK" date +"%T"`

# Print epoch time - convenient for filenames
echo `date +"%s"`

# Print week number
echo Week number: `date +"%V"`

# Create unique filename
f=`date +"%s"`
touch $f
ls -l $f
rm $f

# Add epoch time to existing file
f="/tmp/test"
touch $f
mv $f $f.`date +"%s"`
ls -l "$f".*
rm "$f".*
```
