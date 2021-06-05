## Observable and Observer:
An observable is a data source i.e. from user input events, HTTP requests, etc. Used for asynchronous tasks.
An Observer is an interface used to feed an Observable source with next(), error() and complete(). Able to retrieve a stream of data non-stop until complete() is executed.
Biggest advantage over promises is that observables have operators to transform data using pipe().
```javascript
private anObservable: Subscription;

ngOnInit() {
  anObservable.subscribe(function(){}, error => console.error(error));
  anObservable.pipe(map(x => 3*x));
}

ngOnDestroy(){
  anObservable.unsubscribe();
}
```
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
