## Hook

A hook is a place/interface provided in packaged code/module that allows a programmer to insert customized programming. It is a means of executing custom code (typically implemented through callback functions) either before, after or instead of the existing code. They are a category of function that allows base code to call extension code.

### Why are hooks important?

1. Hooking allows a programmer to change the behavior of a program or to react when something happens without modifying the corresponding class.
2. Hook function helps to add new functionalities to applications.
3. Ensures the inter-communication between other processes and messages of the system.
4. Useful in situations in which a core developer wants to offer extensibility without exposing their code.

## I/O vs CPU Bound

CPU bound means the rate at which process progresses is limited by the speed of the CPU. A program that is CPU bound spends the majority of its time using the CPU i.e. doing calculations. This can be improved by upgrading CPU.

I/O bound means the rate at which a process progresses is limited by the speed of I/O subsystem. Can be associated with disk read/write operations, or networking/communication i.e. web apps, copying files, downloading files. In I/O bound environments, we wait for the resources to be retrieved through I/O subsystems.

## Implementation Detail

Generally refers to the concrete implementation of a certain specification. Implementation details are left to be made by the developer, and is not specified at an earlier level i.e. documentation.

Bad to rely on implementation as it is a behavior produced by code which may be relied on by consuming code. Other implementations of the same specification may not exhibit the same behavior and hence, will break consuming code.

For instance, a specification of a List may say that it is able to hold duplicate values in preserving order while specifying an array sort. If a different sorting algorithm is used, or different type of List i.e. linked list is used, it may break code.

## Web Crawler (Spider)

Type of bot that is typically operated by search engines like Google and Bing. Their purpose is to index the content of websites all across the internet so that those websites can appear in search engine results.

Can also be a generic term for any program that is used to automatically discover and scan websites by following links from one webpage to another.
