## Cancel HTTP Requests

```ts
import { takeUntil } from 'rxjs/operators';

export class YourComponent implements OnInit, OnDestroy {
   ngUnsubscribe = new Subject<void>();

   [...]

   public httpGet(): void {
      this.http.get()
          .pipe( takeUntil(this.ngUnsubscribe) )
          .subscribe( (data) => { ... });
   }

   ngOnDestroy(): void {
       // This aborts all HTTP requests.
       this.ngUnsubscribe.next();
       // This completes the subject properlly.
       this.ngUnsubscribe.complete();
   }
}
```

## Keep Subscription Alive on Error

Need to catch error in inner Observable to not let source Observable die.

```js
this.outerObs$.pipe(
    switchMap(() => {
        return innerObs$.pipe(
            catchError((err) => {
                // do something...
                return of(null);
            })
        );
    })
);
```
