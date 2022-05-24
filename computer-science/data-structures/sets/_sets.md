## Dynamic Sets

Unlike mathematical sets which are unchanging, dynamic sets manipulated by algorithms can grow, shrink or change over time. A dictionary is a dynamic set that supports insertion, deletion and testing of membership. In a typical implementation of dynamic set, each element is represented by an object whose attributes can be examined and manipulated if we have a pointer to the object such as a key.

### Operations

Can be grouped into two categories: queries and modifying operations.

```
SEARCH(S,k)             Key value k
INSERT(S,x)
DELETE(S,x)
MINIMUM(S)
MAXIMUM(S)
SUCCESSOR(S,x)          Query that returns a pointer to next larger element of x in a totally ordered set S
PREDECESSOR(S,x)        Query that returns a pointer to next smaller element of x in a totally ordered set S
```
