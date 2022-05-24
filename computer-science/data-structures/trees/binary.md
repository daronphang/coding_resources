## Binary Trees

Consists of a node and at most two children, left subtree and right subtree. An empty tree is also a binary tree. Binary trees do not have simple relation between size n and height h. Maximum height with n nodes is (n-1), which happens when all non-leaf nodes have precisely one child.

### Selectors

Breaking a non-empty tree into its constituent parts.

```
root(t)     Returns root node of binary tree
left(t)
right(t)
```

### Operations

```
EmptyTree           Returns an empty tree
MakeTree(v,l,r)     Builds binary tree from root node with label v and two binary trees
isEmpty(t)
```

```
// making root node
Leaf(v) = MakeTree(v, EmptyTree, EmptyTree)

t = MakeTree(8, MakeTree(3, Leaf(1), MakeTree(6, EmptyTree, Leaf(7))))

root(left(left(t))) = 1
root(left(left(left(t)))) = EmptyTree
```

```
size(t) {
    if (isEmpty(t)) return 0
    else return (1 + size(left(t)) + size(right(t)))
}
```

### Full

Each node has exactly zero or two children (but never one). A full tree is not always complete and perfect.

### Complete

Complete Binary Trees always have minimal height for size n (log2n). Complete tree may be full but not perfect. Maximum height of binary tree with n nodes is (n-1). To create perfectly balanced trees, need to ensure previous level is full by filling nodes always from the left, before adding to next level. Any search has at most as many steps as the height of tree.

```
n       log2n
2       1
32      5
1024    10
```

### Perfect

All levels including the last level are full of nodes i.e. all levels on tree have maximum number of nodes. A perfect tree is always complete and full. Have precisely 2^k - 1 nodes, where k is last level of tree.

### Balanced

A tree is balanced if the left subtree and right subtree heights differ by at most 1 for every node.

## B-Trees

Generalization of self-balancing binary search tree in which each node can hold more than one search key and have more than two children. Structure is designed to allow more efficient self-balancing, and offers advantages when node data needs to be kept in external storage such as disk drives. Defintion is:

- Every node has at most m children.
- Every non-leaf node (except root) has at least m/2 children.
- Root node has at least two children.
- Non-leaf node with c children contains c-1 search keys which act as separation values to divide its subtrees.
- All leaf nodes appear in the same level and carry information.

![b-nodes](../../images/b-nodes.PNG)
