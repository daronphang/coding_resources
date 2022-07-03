### Compilers

Compilers take a whole program of instructions and translate it to an executable binary code once (parsing). They give the developer more control over hardware aspects including memory management and CPU usage. Translation and execution are separated.

Compiled langauges require a "build" step i.e. need to be manually compiled first. If a change is made, the entire program needs to be rebuilt.

### Interpreters

Interpreters run through a program line by line, converts it first into an intermediary form known as bytecode, followed by converting into binary/machine code, and executing it at run-time. Do not produce binary executable files as compared to compilers. Requires the interpreter to be invoked each time a program is run. Both translation and execution are intertwined if an interpreter is used.

Interpreted languages were once significantly slower than compiled languages, but with the development of just-in-time compilation, that gap is shrinking.

### JIT Compilation (Dynamic Compilation)

JIT compilation is a method for improving the performance of interpreted programs. During execution, JIT compiler determines the most frequently used code and compiles it to machine code.

### Compiled vs Interpreted

|             | Compiled                                                                                                                               | Interpreted                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Speed       | Only one step to get from source code to execution. Code can be executed directly by the CPU as code is translated directly to binary. | At least two steps to get from source code to execution. Translating code at run-time adds to the overhead.                                      |
| Errors      | Compilation errors prevent the code from compiling. Allows for detection of some errors prior to execution.                            | Debugging occurs at run-time. All errors are caught during execution.                                                                            |
| Flexibility | A compiled program will only work on the platform it was designed for.                                                                 | Offers features including dynamic typing and smaller program size. Code itself is platform agnostic as interpreters execute the code themselves. |
| Memory      | Compilers may not need to be present in RAM during execution as they are only needed during compilation.                               | Interpreters must be in RAM during a program's execution.                                                                                        |
| Langauges   | C, C++, Erlang, Rust, Golang                                                                                                           | Python, Javscript, Perl, Java                                                                                                                    |
