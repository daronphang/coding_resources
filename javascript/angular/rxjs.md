## Observable:
Lazy Push collections of multiple values. Similar to Promises that both collections may produce values over time, but Observables may produce none or more than one
value when resolved successfully. Also able to deliver values either synchronously or asynchronously. 
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
  subscriber.next(100); // "return" another value
  subscriber.next(200); // "return" yet another
});
 
console.log('before');
foo.subscribe(x => {
  console.log(x);
});
console.log('after');
```


```javascript
document.addEventListener('click', () => console.log('Clicked!'));

// Using RxJS:
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));
```
## 
