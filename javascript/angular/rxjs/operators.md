## Operators
Two types: Pipeable and Creation Operators. Creation Operators are standalone functions to create a new Observable. Pipeable Operators are functions that can be piped to Observables; when called, they do not change existing Observable instance but returns new Observable. Takes an Observable as its input and returns another Observable; pure operation and the previous Observable stays unmodified.

of(1, 2, 3).subscribe(x => console.log(x));  
obs.pipe(op1(), op2(), op3(), op4());

### Mapping
All map operators help to map (return an Observable) and flatten it (subscribe). 4 flattening strategies available. 
```js
from(urls).pipe(mergeMap(),toArray()).subscribe()
// Will not wait for previous Observable to complete before subscribing; runs in parallel
// To gather all responses at once, use toArray(); emits when source Observable is completed Observable.from()

from(request1).pipe(switchMap(), switchMap()).subscribe()
// Unsubscribes the last mapped Observable when new one arrives; useful for typeahead with debounceTime and distinctUntilChanged

from(urls).pipe(concatMap()).subscribe()
// Queues every new Observable, and subscribes to it only when the last Observable is completed

from(urls).pipe(exhaustMap()).subscribe()
// Ignores every new Observable (temporary disable mapping) until the first Observable is finished; does not keep in memory
```

### Error Handling
To not let Observables die if an error occurs, use catchError() and return an Observable<any>.
```js
from(urls).pipe(
  concatMap(),
  catchError((err) => of(null))
)

const obsArr = [1,2,3].map((item) => this.http.get().pipe(
  catchError((err) => of(null))
))

forkJoin(obsArr).subscribe()
```

### Pipeable
```
// Common Operators
catchError        Returns a new observable or throws an error.
tap               Function returns an identical Observable to the source, but runs the specified callback for each items (side effects).
merge             Flattens multiple Observables together by blending their values into one Observable.             
map               Returns mapped data when subscribed
toArray           Collects all source emissions and emits them as an array when source completes

debounceTime      Works with fromEvent()
delay             Delay emitting value from Observable
take
takeUntil         Argument is an Observable; takes until Observable emits a value
```

https://blog.angular-university.io/rxjs-higher-order-mapping/


```js
import {catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class ExampleService {
  constructor(private http: HttpClient) {}
  
  this.http.get('http://hello-world').pipe(
    catchError(err => throwError('some error msg')),
    map(resItem => {
      console.log(resItem);
    })
  ).subscribe
}

``` 
