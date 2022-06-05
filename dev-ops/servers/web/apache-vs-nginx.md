## Apache vs Nginx

|                           | Apache                                                                                    | Nginx                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Architecture              | Process-Driven approach. Creates a new thread for each request.                           | Event-Driven approach. Handles multiple requests within one thread (lightweight) |
| Performance               | Serves static content using file-based method. Process dynamic content within the server. | Serves static resources without using PHP. Doesn't process dynamic content.      |
| OS Support                | Supports all Unix-like systems including Linux & BSD and fully supports MS-Windows.       | Supports almost all Unix-like OS and Windows partially.                          |
| Centralized Configuration | Allows additional configuration on a per-directory basis via .htaccess files.             | Doesn't allow additional configuration.                                          |
| Request Intepretation     | Passes File system location.                                                              | Passes URI to interpret requests.                                                |
| Feature Modules           | 60 official dynamically loadable modules that can be switched on/off.                     | Third-party core modules that are no dynamically loadable.                       |
| Flexibility               | Supports customization of web server through dynamic modules.                             | Not flexible enough to support dynamic modules and loading.                      |
| Security                  | Great security.                                                                           | Better security with smaller codebase.                                           |

## Architecture

### Apache

Apache follows a multi-threaded approach. Provides a variety of multiple processing modules, each is meant for different server-needs. The MPMs (Multi-Processing Modules) provide a flexible architecture for choosing different connections and different handling algorithms:

1. Process (Pre-fork) MPM
2. Worker MPM
3. Event MPM

In other words, Apache creates a new thread each time to handle a connection request. A thread is the smallest sequence of programmed instructions that can be managed independently by a scheduler. In most cases, a thread is a component of a process. However, this can lead to heavy resource consumption.

### Nginx

Nginx employs an event-driven architecture and deals with requests asynchronously. It was designed to use a non-blocking event-driven connection handling algorithm. Hence, its process can handle thousands of connection requests within one processing thread.

## Performance

### Apache

Static content or files are stored on disk on the server computer suchas CSS, JS files and images. They are served using file-based method.

Can process dynamic content within the web server itself without having to rely on any external components.

### Nginx

Serves static resources without PHP and performs 2.5x faster than Apache.

All requests with dynamic webpage content are passed to an external process i.e. PHP-FPM for execution. Nginx waits for the final content to come back and delivers it back to the client.

## Request Interpretation

### Apache

Passes requests as file system locations

### Nginx

Doesn't provide a mechanism for specifying config. Passes requests as URI instead of file system locations; this allows Nginx to function easily as both Web and Reverse Proxy server.
