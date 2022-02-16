### Higher-Order Observable Mapping

Mapping a value into an Observable, which in turn can be subscribed to retrieve its corresponding value. ConcatMap, MergeMap, SwitchMap are all higher-order mapping operators. Benefits of using them are avoiding nested subscription.

https://blog.angular-university.io/rxjs-higher-order-mapping/

### Observable Concatenation 

Only works when observables are completing i.e. all values are emitted.
```js
const series1$ = of('a', 'b');
const series2$ = of('x', 'y');

const result$ = concat(series1$, series2$);
result$.subscribe(console.log); // a b x y
```

### ConcatMap

Combination of higher-order mapping and concatenating Observables. Takes each value in array and transforming into an inner Observable, subscribes to it and sends the output to the result Observable. Waits for previous HTTP Observable to complete before mapping the new value to an HTTP Observable.

```js
// Queues every new Observable, and subscribes to it only when the last Observable is completed
from(urls)
  .pipe(
    concatMap(url => this.http.get(url)
  ).subscribe();

```




### Mapping

All map operators help to map (return an Observable) and flatten it (subscribe). 4 flattening strategies available.

```js
from(urls).pipe(mergeMap(), toArray()).subscribe();
// Will not wait for previous Observable to complete before subscribing; runs in parallel
// To gather all responses at once, use toArray(); emits when source Observable is completed Observable.from()

from(request1).pipe(switchMap(), switchMap()).subscribe();
// Unsubscribes the last mapped Observable when new one arrives; useful for typeahead with debounceTime and distinctUntilChanged



from(urls).pipe(exhaustMap()).subscribe();
// Ignores every new Observable (temporary disable mapping) until the first Observable is finished; does not keep in memory
```
