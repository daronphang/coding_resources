### Operators

Two types: Pipeable and Creation Operators. Creation Operators are standalone functions to create a new Observable. Pipeable Operators are functions that can be piped to Observables; when called, they do not change existing Observable instance but returns new Observable. Takes an Observable as its input and returns another Observable; pure operation and the previous Observable stays unmodified.

```js
of(1, 2, 3).subscribe((x) => console.log(x));
obs.pipe(op1(), op2(), op3(), op4());
```

## Pipeable

https://indepth.dev/reference/rxjs/operators

```
catchError        Returns a new observable or throws an error.
tap               For running side effects
from              Creates an Observable from an array-like/iterable object
combineLatest     Combines values from all Observables passed in an Observable array; will not emit an initial value until each Obs emits at least once
forkJoin          Similar to combineLatest, but only cares about the final emitted value of each Obs; will lose value of all if error is not catched in inner obs
toArray           Collects all source emissions and emits them as an array when source completes
debounceTime      Works with fromEvent()
delay             Delay emitting value from Observable
take              Specify number of Observables to subscribe to
takeUntil         Argument is an Observable; takes until Observable emits a value
takeWhile         Executes predicate fn and if true, passes down, else completes stream
filter            Executes predicate fn and returns value if true; doesn't complete Observable
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

### Error Handling

To not let Observables die if an error occurs, use catchError() and return an Observable<any>.

```js
from(urls).pipe(
  concatMap(),
  catchError((err) => of(null))
);

const obsArr = [1, 2, 3].map((item) =>
  this.http.get().pipe(catchError((err) => of(null)))
);

forkJoin(obsArr).subscribe();
```
