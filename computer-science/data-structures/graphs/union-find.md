### Union-Find Algorithm (Disjoint-Set Data Structure)

Disjoint-set is a data structure that keeps track of a set of elements partitioned into several disjoint (non-overlapping) subsets i.e. a disjoint set is a group of sets where no item can be in more than one set.
Can be used to check whether an undirected graph contains cycle or not. Performs two operations on such data structure.

#### Find

Determines which subset a particular element is in. Can be used to check if two elements are in the same subset.

#### Union

Joins two subsets into a single subset. Have to check if two subsets belong to the same set; if true, union cannot be performed. 

