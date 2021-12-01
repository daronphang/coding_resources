## Basics:
A variable that is used to store the memory address of another variable (in hexadecimal format). Also termed as special variables. 

### Purpose:
Pointers are used for efficiency as everything in Golang is passed by value i.e. value passed to function is a copy and not the original object to avoid unintentionally changing data.
- Variables are names given to a memory location where the actual data is stored.
- To access stored data, need address of memory location.
- For human readability, data can be accessed through variables instead of hexadecimal format.
- Pointers are used to pass a variable's memory location and then dereference it for manipulation as needed.
- Instead of copying large amount of data everytime it is passed, programmers can pass its address.
