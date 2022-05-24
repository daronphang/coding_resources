## Traversing BST

There are different ways of traversing a binary tree, depending on the order that the nodes are are visited: in-order, pre-order, and post-order.

### In-Order

Prints the key of the root of subtree between printing the values in its left subtree and in its right subtree.

```
inOrder(x) {
    if x != NIL
        inOrder(x.left)
        print(x.key)
        inOrder(x.right)
}
```

### Pre-Order

Prints the root first before the values in either subtree.

### Post-Order

Prints root after the values in subtrees.
