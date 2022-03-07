### Probabilistic Analysis

The use of probability in the analysis pf problems. Commonly used to analyze the running time of an algorithm. Requires using knowledge of or making assumptions about the distribution of the inputs i.e. averaging the running time over all possible inputs.

An algorithm is randomized if its behavior is determined not only by its input but also by values produced by a random-number generator.

### Randomized Algorithms

Most randomized algorithms randomize the input by permuting the given input array.

#### Permute by Sorting

One common method is to assign each element of the array a random priority, and then sort them according to those priorities. This method produces a uniform random permutation of input, provided all priorities are distinct.

```
inputs = [1, 2, 3]
permutated = []
n = inputs.length
for (i=0; i < n; i++)
    P[i] = Random(1, n^3)
```

#### Permute Given Array (Randomize-In-Place)

```
inputs = [1, 2, 3]
n = inputs.length
for (i=1; i < n; i++)
    swap inputs[i] with inputs[random[i, n]]
```
