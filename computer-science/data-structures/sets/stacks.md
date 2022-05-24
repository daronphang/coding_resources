## Stacks

Equivalent to linked lists on an abstract level. Ideal structure to model First-In-Last-Out (FILO), or Last-In-First-Out (LIFO) strategy in search.

### Operations

```
stackEmpty(S) {
  // S.top returns the index of the most recently inserted element
  if S.top == 0
    return True
  return False
}

push(S,x) {
  S.top = S.top + 1
  S[S.top] = x
}

pop(S) {
  if stackEmpty(s)
    error "underflow"
  S.top = S.top - 1
  return S[S.top + 1]
}
```
