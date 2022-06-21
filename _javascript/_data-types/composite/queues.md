## Queues

A queue is an ordered list of elements where an element is inserted at end of queue and is removed from the front of the queue. Models FIFO principle. Has two main operations:

-   Enqueue: inserts an element at end of queue (push).
-   Dequeue: Removes an element from front of queue (shift).
-   Peek: Gets element at front/back of queue.

```js
class Queue {
    constructor() {
        this.elements = [];
    }

    enqueue(value) {
        this.elements.push(value);
    }

    dequeue(value) {
        return this.elements.shift();
    }

    // Can get element from front or back
    peek() {
        return this.elements[this.elements.length - 1];
    }

    size() {
        return this.elements.length;
    }
    clear() {
        this.items = [];
    }
}
```
