## Higher-Order Observable Mapping

Mapping a value into an Observable, which in turn can be subscribed to retrieve its corresponding value. ConcatMap, MergeMap, SwitchMap are all higher-order mapping operators which help to map (return an Observable) and flatten it (subscribe). Benefits of using them are avoiding nested subscription.

https://blog.angular-university.io/rxjs-higher-order-mapping/

### Observable Concatenation

Only works when observables are completing i.e. all values are emitted.

```js
const series1$ = of("a", "b");
const series2$ = of("x", "y");

const result$ = concat(series1$, series2$);
result$.subscribe(console.log); // a b x y
```

### Observable Merging

Useful in situations where you want to run things in parallel, without waiting for previous inner Observable to complete. Merge subscribes to every merged Observable at the same time, and then outputs values of each source Observable to the combined result Observable as the multiple values arrive over time. If one of the merged Observable completes, merge will continue to emit the values of other Observables as they arrive.

```js
const series1$ = interval(1000).pipe(map((val) => val * 10));
const series2$ = interval(1000).pipe(map((val) => val * 100));

// both Observables will emit values at 1s interval and never complete
const result$ = merge(series1$, series2$);
result$.subscribe(console.log);
```

### Observable Switching

If a new observable starts emitting values, the previous Observable will be unsubscribed before subscribing to the new Observable. Ensures that unsubscription logic of unused Observables gets triggered so resources can be released.

### Exhaust Strategy

Ignores new values in the source Observable until the previous value is completely processed. The new Observable will be discarded by exhaust strategy and not subscribed to.

### ConcatMap

Combination of higher-order mapping and concatenating Observables. Takes each value in array and transforming into an inner Observable, subscribes to it and sends the output to the result Observable. Waits for previous HTTP Observable to complete before mapping the new value to an HTTP Observable.

```js
// Queues every new Observable, and subscribes to it only when the last Observable is completed
from(urls)
  .pipe(
    concatMap(url => this.http.get(url)
  ).subscribe();
```

### MergeMap

Combines merge strategy and higher-order mapping. Immediately reflects output in output Observable once the inner Observable emits a value. Can have multiple inner Observables overlapping over time, emitting values in parallel. To gather all responses at once, use toArray() which will emit when source Observable is completed.

```js
from(urls)
  .pipe(
    mergeMap(url => this.http.get(url)
  ).subscribe();

from(urls)
  .pipe(
    mergeMap(),
    toArray()
  ).subscribe();
```

### SwitchMap

Very common use case is search Typeahead with debounceTime and distinctUntilChanged.

```js
from(request1).pipe(switchMap(), switchMap()).subscribe();
```

### ExhaustMap

Ignores every new Observable (temporary disable mapping) until the first Observable is finished; does not keep in memory.

https://www.tektutorialshub.com/angular/using-exhaustmap-in-angular/

```js
from(urls).pipe(exhaustMap()).subscribe();
```
