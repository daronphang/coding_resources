## Stacks

```js
class Stack {
    constructor() {
        this.elements = [];
    }

    add(value) {
        this.elements.push(value);
    }
    pop() {
        return this.elements.pop();
    }
    size() {
        return this.elements.length;
    }
    isEmpty() {
        return this.elements.length === 0 ? true : false;
    }
    clear() {
        this.items = [];
    }
}
```
