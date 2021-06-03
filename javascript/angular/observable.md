## Fundamentals:
An observable is a data source i.e. from user input events, HTTP requests, etc. Used for asynchronous tasks.
Observer can either handle data, error or completion. 
```javascript
private anObservable: Subscription;

ngOnInit() {
  anObservable.subscribe(function(){}, error => console.error(error));
}

ngOnDestroy(){
  anObservable.unsubscribe();
}
```
