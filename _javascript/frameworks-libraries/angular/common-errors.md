## ExpressionChangedAfterItHasBeenCheckedError

Angular throws if a property was changed after it was rendered in the DOM. Commonly causes include ngAfterViewInit which is called after DOM update operations, and using shared services between parent and child components whereby child updates a value to the service which in turns updates the property on the parent component.

### Fixes

1. Asynchronous update.
2. Forcing change detection.
3. Updating property in constructor instead of ngOnInit().

```js
// Asynchronous update
ngAfterViewInit() {
    setTimeout(() => {
        this.parent.name = 'updated name';
    });
}
```

```js
constructor (private cd: ChangeDetectorRef) {};
ngAfterViewInit() {
  this.cd.detectChanges();
}
```

```js
constructor(private sharedService: SharedService) {
  this.sharedService.showHeader = true;
}
```

https://indepth.dev/posts/1001/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error
