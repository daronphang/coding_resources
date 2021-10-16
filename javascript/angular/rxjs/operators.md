## Operators:
Two types: Pipeable and Creation Operators. Creation Operators are standalone functions to create a new Observable. Pipeable Operators are functions that can be piped to Observables; when called, they do not change existing Observable instance but returns new Observable. Takes an Observable as its input and returns another Observable; pure operation and the previous Observable stays unmodified.

of(1, 2, 3).subscribe(x => console.log(x));  
obs.pipe(op1(), op2(), op3(), op4());

```
// Common Operators
catchError        Returns a new observable or throws an error.
tap               Function returns an identical Observable to the source, but runs the specified callback for each items (side effects).
merge             Flattens multiple Observables together by blending their values into one Observable.             
map 

Mapping:
All map operators help to map (return an Observable) and flatten it (subscribe). 4 flattening strategies available. 
mergeMap()        Will not wait for previous Observable to complete before subscribing; runs in parallel 
switchMap()       Unsubscribes the last mapped Observable when new one arrives; useful for typeahead with debounceTime and distinctUntilChanged
concatMap()       Queues every new Observable, and subscribes to it only when the last Observable is completed.
exhaustMap()      Ignores every new Observable (temporary disable mapping) until the first Observable is finished; does not keep in memory.

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
