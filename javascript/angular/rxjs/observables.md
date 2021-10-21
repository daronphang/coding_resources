## Overview:
- **Observable**: Data source i.e. from user input events, HTTP requests, etc. 
- **Observer**: An interface that executes instructions when there is a new value or change in the Observable, and delivers values to the Observable using next(), error() or complete().
- **Subscription**: An Object that represents a disposable resource with unsubscribe(). 

Observable -> Connected to Observer -> Performs execution that delivers value to Observable -> Observable is subscribed to emit value.

Can use of() method as mock API which returns an Observable and emits values in a sequence upon subscription.

For infinite subscriptions, need call OnDestroy() to manually unsubscribe. Examples include forms, router, and intervals. For finite subscriptions like HTTP calls or take(1), no need to unsubscribe.

```javascript
let subscription = new Subscription;
let observable = Observable.create((observer:any) => {
   observer.next('I am number 1')
   observer.next('I am number 2')
   observer.error('I am number 3')
   observer.complete('I am number 4')
   observer.next('I am number 5')
})

const subscription = observable.subscribe(msg => console.log(msg));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);   // putting subscriptions together

ngOnDestroy() {
   this.subscription.unsubscribe();    // unsubscribes both parent and child subscriptions
}
```

## Advantages Over Promises:
- An Observable pushes a stream of values whereas Promise pushes one resolved value.
- Observables are declarative whereby computation does not start until subscription whereas promises are executed immediately on creation.
- Error handlers can be done inside Observables rather than a construct like Promises.
- Data can be transformed using operators through pipe(). 

## Subjects:
Inherits operators and methods from Observable and implements Observer interface. An important distinction is that Observable is unicast while Subject is multicast i.e. Subject can cast values to multiple subscribers. Also have ReplaySubject for replaying last emitted event, and BehaviorSubject for setting initial value.
```javascript
const subject = new Subject()
subject.next('This is an observable');
subject.subscribe(value => console.log(value));   // 'This is an observable'
subject.next('This is another observable');

const behSubject = new BehaviorSubject('set initial value');
behSubject.subcribe(value => console.log('value');
```

Recommended way rather than using emit(). Used for active events rather than passive like HTTPrequests.
```javascript
// services:
import { Subject } from 'rxjs';

someEmitter = new Subject<boolean>();

// component.ts to listen:
this.services.someEmitter.subscribe()   // or next()
```
## Subscribe:
Subscribe() can take 3 arguments as follows:
1) onNext: Function to invoke for each element in observable sequence.
2) onError: Function to invoke upon exceptional termination.
3) onCompleted: Function to invoke upon graceful termination.

## Unsubscribe:
When navigating somewhere else, Angular will destroy the component; need to unsubscribe to prevent memory leak. Use pipe operators to auto-unsubscribe such as first() and take(). For unsubscribing best practices:
- Store all subscriptions in an array and using .forEach() in ngOnDestroy().
- Using .takeUntil()


## Emitting Empty Observables:
```js
import { NEVER, EMPTY, of } from 'rxjs';

someObs$.pipe(tap(() => {
   NEVER;   // emits no events and never ends
   EMPTY;   // emits only complete;
   of();    // emits both next and complete
}));
```
