## Operators:
```
catchError        Returns a new observable or throws an error.

Mapping:
All map operators help to map (return an Observable) and flatten it (subscribe). 4 flattening strategies available. 
mergeMap()        Keep subscribing to every new Observable that is returned from the map.
switchMap()       Unsubscribes the last mapped Observable when the new one arrives.
concatMap()       Queues every new Observable, and subscribes to it only when the last Observable is completed.
exhaustMap()      Ignores every new Observable (temporary disable mapping) until the first Observable is finished; does not keep in memory.

```
