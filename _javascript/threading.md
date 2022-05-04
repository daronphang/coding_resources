### Web Workers

Thread refers to a unit capable of executing code. JS was conceived as single-threaded programming language that ran in browser between all tabs i.e. only one set of instructions is executed at any time. However, modern JS offers ways to create additional threads, each executing independently while possibly communicating between one another through use of web workers.

Web Workers are JS scripts executed from HTML page that runs on a background thread away from main execution thread. Can utilize web workers to run process intensive tasks from browser without creating blocking instances.
