### Testing DOM

Ensure fixture.detectchanges() is present after every DOM change. For async ngIf, use fakeasync() and tick() to control.

To trigger events programmatically, can use dispatchEvent() and doesn't require fakeAync() as it is synchronous. Can also use triggerEventHandler() provided by Angular; however, it will invoke only if it was declared on native element using event bindings such as @HostListener and @Output.

```js
it("should set the 😜 on mouseenter", () => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();

  const h1 = fixture.debugElement.query(By.css("h1"));
  const mouseenter = new MouseEvent("mouseenter");
  h1.nativeElement.dispatchEvent(mouseenter);

  fixture.detectChanges();
  expect(
    fixture.debugElement.query(By.css("h1")).nativeElement.innerText
  ).toEqual("😜");
});
```
