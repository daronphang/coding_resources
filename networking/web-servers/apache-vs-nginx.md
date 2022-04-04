### Apache vs Nginx

|                           | Apache                                                                                    | Nginx                                                                       |
|---------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Architecture              | Process-Driven approach. Creates a new thread for each request.                           | Event-Driven approach. Handles multiple requests within one thread.         |
| Performance               | Serves static content using file-based method. Process dynamic content within the server. | Serves static resources without using PHP. Doesn't process dynamic content. |
| OS Support                | Supports all Unix-like systems including Linux & BSD and fully supports MS-Windows.       | Supports almost all Unix-like OS and Windows partially.                     |
| Centralized Configuration | Allows additional configuration on a per-directory basis via .htaccess files.             | Doesn't allow additional configuration.                                     |
| Request Intepretation     | Passes File system location.                                                              | Passes URI to interpret requests.                                           |
| Feature Modules           | 60 official dynamically loadable modules that can be switched on/off.                     | Third-party core modules that are no dynamically loadable.                  |
| Flexibility               | Supports customization of web server through dynamic modules.                             | Not flexible enough to support dynamic modules and loading.                 |
| Security                  | Great security.                                                                           | Better security with smaller codebase.                                      |
                                                                     
