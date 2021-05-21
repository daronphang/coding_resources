## Asynchronous Tasks:
1) Asynchronous tasks such as image loading and timers are non-blocking as they take place in web APIs environment and not in callstack.
2) Callback functions attached to the asynchronous events through addEventListener are only placed in callback queue after the events have completed.
3) Callback functions in callback queue will wait for event loop to pick them up and put into callstack. 
4) For promises, they have special callback queue known as microstasks queue which has priority over callback queue.
