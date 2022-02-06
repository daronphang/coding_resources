### Testing Observables

Do not use done() for async functions as it may call success even if:

- Observable emits 1000x times in a loop.
- Observable errors after first emit.

Use fakeAsync() instead to run codes synchronously. Can call flushMicrotasks() to run any pending micro tasks or tick() to execute asynchronous code within that timeframe. Can
use both for promises.

```js
import {
  TestBed,
  fakeAsync,
  tick,
  flushMicrotasks,
} from "@angular/core/testing";

it("getData should return value that contains test", fakeAsync(() => {
  const stream = of("testing value");
  mockStream.dataStream.and.returnValue(stream);
  let capturedValue: String = null;

  service.getData().subscribe((value) => {
    capturedValue = value;
  });

  flushMicrotasks();

  expect(capturedValue).toBe("testing value");
}));
```
