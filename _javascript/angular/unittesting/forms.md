### Testing Form Submit

Can either use click on native element, triggerEventHandler(), dispatchEvent() or programmatically submitting form directly.

```js
it("should trigger _onSearchHandler() if form is submitted", () => {
  spyOn(component, "_onSearchHandler");

  const searchFormEl = fixture.debugElement.query(By.css("#searchForm"));
  searchFormEl.triggerEventHandler("ngSubmit", null);
  fixture.detectChanges();

  expect(component._onSearchHandler).toHaveBeenCalled();
});
```
