### Algorithms

An algorithm for a particular task can be defined as a finite sequence of instructions, each of which has a clear meaning and can be performed with a finite amount of effort in a finite length of time.

### Fundamentals

Given an algorithm to solve a problem, the three key aspects are:

1. Specification: What is it supposed to do?
2. Verification: Does it really do what it is supposed to do?
3. Performance Analysis: How efficiently does it do it?

For many problems, the ability to formulate an efficient algorithm depends on being able to organize data in an appropriate manner.

### Efficiency and Complexity

**Time complexity** refers to how the execution time depends on the size of data structure. Another important efficiency consideration is how much memory a given program will require for a particular task i.e. **space complexity** refers to how the memory requirement depends on size of data structure.

For a given task, there are often algorithms which trade time for space, and vice versa. Another consideration is whether the average case performance of an algorithm is important, or whether it is more important to guarantee that even in the worse case, the performance obeys certain rules. For time-critical problems i.e. monitoring aeroplanes in air space, it may be totally unacceptable for algorithm to take too long if worse case arises. Nonetheless, modern days are mostly interested in time complexity.

### Concrete Measures for Performance

For testing algorithms, the machine which is run on, the compiler used, and many factors can influence performance. Also, the data used to test must be typical for application you created for.

To not be bound to a language or machine architecture, it is better to measure efficiency of an algorithm rather than its implementation. Hence, algorithms are usually best expressed in form of pseudocode that comes close to implementation language.

To determine time complexity of an algorithm, need to count the number of times each operation will occur i.e. number of steps.

### Big O-Notation for Complexity Class

Very often, we are not interested in actual function that describes time complexity but just its complexity class. This ignores any constant overloads and small constant factors, and tells us about the principal growth of complexity function.

#### Complexity Classes

```
O(1)            Constant complexity
O(log2log2n)
O(log2n)        Logarithmic complexity
O(n)            Linear complexity
O(nlog2n)
O(n^2)          Quadratic complexity
O(n^3)          Cubic complexity
O(2^n)          Exponential complexity
```
