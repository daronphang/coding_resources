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

'#!' is an operator called shebang which directs the script to the interpreter location i.e. '#! /bin/sh' directs script to the bourne-shell.

```sh
#!/bin/sh
ls
```

### Shell Variables

```sh
#!/bin/sh
variable ="Hello"
echo $variable
echo "what is your name?"
read name
echo "How do you do, $name?"
read remark
echo "I am $remark too!"
```
