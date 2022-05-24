## Queues

Implements First-In-First-Out (FIFO) policy. Element to be deleted is always the one that has een in the set the longest time. Has a head and tail.

### Operations

```
enqueue(Q, x) {
  Q[Q.tail] = x
  if (Q.tail === Q.length)
    Q.tail = 1
  else
    Q.tail = Q.tail + 1
}

dequeue(Q) {
  x = Q[Q.head]
  if Q.head == Q.length
    Q.head = 1
  else
    Q.head = Q.head + 1
  return x
}
```
