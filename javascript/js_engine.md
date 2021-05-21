## Asynchronous Tasks:
1) Asynchronous tasks such as image loading and timers are non-blocking as they take place in web APIs environment and not in callstack.
2) Callback functions attached to the asynchronous events through addEventListener are only placed in callback queue once completed.
3) Callback functions in callback queue will wait for event loop to pick them up and put into callstack. 
4) For promises, they have special callback queue known as microstasks queue which has priority over callback queue.

## Event Loop:
The activity of event loop taking a callback function from callback queue and execute in the callstack is known as event loop tick. Coordinates between callstack and callback functions in callback queue. 
```javascript
console.log('Test Start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('resolved promise 1').then(res => console.log(res));
Promise.resolve('resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
};
console.log('Test End');

// Test Start
// Test End
// resolved promise 1
// resolved promise 2
// 0 sec timer      Happens after microtasks queue is completed. Cannot do high precision tasks with Javascript timers.
```
