## Checking Interface Type

Create a user-defined type guard (https://www.typescriptlang.org/docs/handbook/advanced-types.html).

```js
// Check whether object type is GcpObject
export function isGcpObject(obj: GcpObject | boolean): obj is GcpObject {
    return (obj as GcpObject).String !== undefined;
}

if(isGcpObject(item) {
  console.log(item.String);
}
```
