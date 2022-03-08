### Priority Queues

A priority queue is a data structure for maintaining a set S of elements, each with an associated value called a **key**. Comes in two forms: max-priority and min-priority queues which are in turn based on max/min heaps. Examples of applications include scheduling of jobs (max) and event-driven simulator in order of time of occurrence (min).

### Operations (Max-Priority)
``` 
INSERT(S,x)             Inserts an element into set S
MAXIMUM(S)              Returns element of S with largest key
EXTRACT-MAX(S)          Removes and returns the element S with largest key
INCREASE-KEY(S,x,k)     Increases value of element x's key to new value k whereby k >= x
```

### Operations (Min-Priority)
``` 
INSERT(S,x)             Inserts an element into set S
MINIMUM(S)              Returns element of S with smallest key
EXTRACT-MIN(S)          Removes and returns the element S with smallest key
DECREASE-KEY(S,x,k)     Decreases value of element x's key to new value k whereby k <= x
```

### 
