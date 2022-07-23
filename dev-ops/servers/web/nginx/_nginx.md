## Nginx

An open-source web server that can also be used as a reverse proxy, HTTP cache, and load balancer. Built to offer low memory usage and high concurrency. Rather than creating a new process for each web request, Nginx uses an asynchronous, event-driven approach where requests are handled in a single thread.

With Nginx, one master process can control multiple worker processes. The master maintains the worker processes, while the workers do the actual processing.
