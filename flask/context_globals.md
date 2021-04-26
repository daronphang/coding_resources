# Application & Request Contexts:
Contexts enable Flask to make certain variables globally accessible to a thread without interfering with other threads.

Application Context Variables:  
1) current_app: application instance for active application
2) g: an object that the application can use for temporary storage during handling of request; variable is rest with each request.

Request Context Variables:  
1) request: request object that encapsulates the contents of an HTTP request send by the client.
2) session: a dictionary that the application can use to store values that are "remembered" between requests.
