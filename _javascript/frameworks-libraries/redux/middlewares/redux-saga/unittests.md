### Libraries

```
redux-saga-test
redux-saga-testing
redux-saga-test-engine
redux-saga-tester
redux-saga-test-plan
```

### Example

```js
describe("itemSaga", function () {
  const watcherSaga = itemSaga();
  it("should takeLatest GET_ITEM_REQUEST", function () {
    expect(watcherSaga.next().value).toEqual(
      takeLatest("GET_ITEM_REQUEST", readItem)
    );
  });
  const workerSaga = readItem();
  it("should call readItemById", function () {
    expect(workerSaga.next().value).toEqual(call(readItemById(100)));
  });
  it("should take GET_ITEM_SUCCESS", function () {
    expect(workerSaga.next().value).toEqual(
      put(readItemSuccessAction({ id: 100, name: "item" }))
    );
  });
  it("should be done", function () {
    expect(workerSaga.next().done).toEqual(true);
  });
});
```
