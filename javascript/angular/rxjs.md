### Observable:
Lazy Push collections of multiple values. Similar to Promises that both collections may produce values over time, but Observables may produce none or more than one
value when resolved successfully. Also able to deliver values either synchronously or asynchronously. Use try/catch block.
```javascript
function foo() {
  console.log('Hello');
  return 42;
  return 100; // dead code. will never happen
}

// With Observables:
import { Observable } from 'rxjs';
 
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => {
    subscriber.next(300);     // happens asynchronously
  }, 1000);
  subscriber.complete();
});
 
console.log('before');
foo.subscribe(x => {
  console.log(x);
});
console.log('after');
```
### Observer:
Consumer of values delivered by an Observable i.e. a set of callbacks.
```javascript
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

observable.subscribe(observer);
```
### Operators:
Operators are functions. Allows complex asynchronous code to be easily composed. Two types of operators, pipeable and creation. Pipeable generates another Observable as output.
Creation operators take a value as input and return an Observable as output.
```javascript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(`value: ${v}`));

// Logs:
// value: 1
// value: 4
// value: 9

obs.pipe(op1(), op2(), op3(), op4());   // chain functions together using .pipe()
```
Documentation for operators: https://rxjs.dev/guide/operators


```javascript
document.addEventListener('click', () => console.log('Clicked!'));

// Using RxJS:
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));
```
## 
