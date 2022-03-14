### Optimal BST

Suppose that we are designing a program to translate from English to French. For each occurrence of each English word in the text, we need to look up its French equivalent. This could be done using BST with French equivalents as satellite data. Nonetheless, as we are searching for each individual word throughout the tree, we want the total time spent searching (cost of search) to be as low as possible. Words with higher frequencies should be placed nearer towards the root, and vice versa. 

To minimize the number of nodes visited per search, we can design an optimal BST as follows:
- Given a sequence K = {K1, K2, ..., Kn} of n distinct keys in sorted order.
- Each key Ki has probability Pi that a search will be for Ki.
- Some searches may be for values not in K, so "dummy keys" are added with n+1 leaves.
- Di represents all values less than Ki, and Dn for all values greater than Kn.
- For each dummy key Di, it has a probability Qi that a search will correspond to Di.
- Summation of Pi and Di = 1. 

```
searchCostKey = level of node * frequency/probability
searchCostBST = summation of searchCostKey for each key
```

#### Figure

<img src="../../images/optimal-BST-example.PNG">
