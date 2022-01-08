### Task Queues

Manage background work that must be executed outside the usual HTTP request-response cycle.

Tasks are handled asynchronously either because they are not initiated by an HTTP request or are long-running jobs that would dramatically reduce the performance
of an HTTP response. Example is having database query performed in background on fixed intervals with results stored in database; when HTTP request comes, it would simply
fetch the precalculate result instead of re-executing the longer query. Other types of jobs include:

- Spreading out large numbers of independent database inserts over time
- Aggregating collected data values on fixed interval.
- Scheduling periodic jobs such as batch processes.
