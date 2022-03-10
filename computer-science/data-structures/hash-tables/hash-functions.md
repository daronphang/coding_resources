### Hash Functions

A good hash function satisfies the assumption of simple uniform hashing: each key is equally likely to hash to any of the m slots, independently of where any other key has hashed to. Also, one would minimize the chance that such variants hash to the same slot. However, there is no way to check this condition. In practice, can employ heuristic schemes which includes hashing by division or multiplication. 

### Intepreting Keys as Natural Numbers

Most hash functions assume that the universe of keys is a natural number. Hence, need to convert them if they are not i.e. string. For strings, can express them in suitable radix notation (base of an integer of unique digits).

```
// radix-128
"pt" => (112, 116) in ASCII => (112*128) + 116 = 14452
```

### Division

Method maps a key k into one of m slots by taking the remainder of k divided by m. When using this method, need to avoid certain values of m i.e. should not be a power of 2. A good choice would be a prime number that is not too close to an exact power of 2. 

```
h(k) = k mod m
```

### Multiplication

Hash function operates in two steps. Advantage of this method is that value of m is not critical. Typically choose it to be a power of 2 since it can be easily implemented on most computers. 
- Multiply key k by a constant A in the range 0 < A < 1 and extract the fractional part.
- Multiply the value by m and the take the floor of the result (round down). 

```
h(k) = m(kA mod 1)
```

### Universal Hashing

In universal hashing, the hash function is chosen randomly from a universal collection of hash functions that is independent of the keys that are actually going to be stored. 

###
