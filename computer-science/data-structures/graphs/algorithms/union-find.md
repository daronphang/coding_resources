### Union-Find Algorithm (Disjoint-Set Data Structure)

Disjoint-set is a data structure that keeps track of a set of elements partitioned into several disjoint (non-overlapping) subsets i.e. a disjoint set is a group of sets where no item can be in more than one set.
Can be used to check whether an undirected graph contains cycle or not. Performs two operations on such data structure.

#### Find 

Determines which subset a particular element is in and returns the representative of that particular set. Can be used to check if two elements are in the same subset i.e. if two elements are in the same set, they have the same representation, else they belong to different sets. 

#### Union

Merges two subsets into a single subset. Have to check if two subsets belong to the same set; if true, union cannot be performed. 

### Example

``` 
// consider 10 disjoint sets
{1}, {2}, {3} ... {9}, {10}

// union(1,2), union(3, 4), union(4, 8), union(9, 3)
S1 = {1, 2}
S3 = {9, 3, 4, 8} // connected nodes

// find(8, 9)
Find(8, 9) = true // though not connected directly, there exists a path connecting 8 and 9
```

```py
class DisjointSet:
    parent = {}
 
    # perform MakeSet operation
    def makeSet(self, universe):
        # create `n` disjoint sets (one for each item)
        for i in universe:
            self.parent[i] = i
 
    # Find the root of the set in which element `k` belongs
    def Find(self, k):
        # if `k` is root
        if self.parent[k] == k:
            return k
        # recur for the parent until we find the root
        return self.Find(self.parent[k])
 
    # Perform Union of two subsets
    def Union(self, a, b):
        # find the root of the sets in which elements
        # `x` and `y` belongs
        x = self.Find(a)
        y = self.Find(b)
 
        self.parent[x] = y
```
