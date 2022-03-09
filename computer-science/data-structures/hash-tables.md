### Implementations of Table Data Structure

#### Sorted Arrays

Can use binary search which has time complexity of O(log2n) for finding, and O(n) for inserting/deleting.

#### Binary Search Trees

In the worst case, tree can be very deep and narrow, and has linear complexity when it comes to searching.

### Strategies for Dealing with Collisions

Given a table with 11 entries, and each key is represented as 3 character string.

![nodes](../images/hash-table-example.PNG)

#### Buckets

Reserves two-dimensional array from start. Each column is represented asa bucket in which we throw all elements giving the same result when hash function is applied. However, it has to reserve more space than required, and searching will add overhead cost.

![nodes](../images/buckets.PNG)

#### Direct Chaining

Creates a linked list for the set of entries corresponding to each key. Advantage is that it does not reserve any space that will not be taken up, but lists will ahve to be traversed when searching.

![nodes](../images/direct-chaining.PNG)

#### Open Addressing

Involves finding another open location for any entry which cannot be placed where its hash function points. Easiest strategy for achieving this (linear probing) is to search for open locations by decreasing the index considered by one until an empty space is found. Better approach is to search for an empty location using secondary hash function; process is called double hashing.

#### Linear Probing

For keys having same index, linear probing reduces index until an empty space is found. Else, starts again at the end i.e. if index 4 is filled, searches index 3, and etc.

Though all keys can be inserted in a way that makes good use of space, we can no longer use same hash function to find a particular key. Deleting/inserting new keys also become complicated. Will also have clustering issues whereby if multiple keys are hitting the same primary location, the blocks/clusters needed to be tested down the index grows larger each time.

#### Double Hashing

Applies a secondary hash function to tell us how many slots to jump to look for an empty slot if a key's primary location has been filled already. One possible method is as follows:

```
hh(n) = (k/11) % 11; returns 1 if remainder is 0

where k is primary key associated with three-character code
```

When choosing secondary hash functions, in order to avoid primary clustering, one has to make sure that different keys with same primary position give different results. Also, the result cannot be a common divisor with the size of hash table i.e. hash table of size 10, and if secondary hash function returns 2/5/4/6/8, then only half of locations will be checked which might result in failure (endless loop). A simple remedy is to make sure size of hash table is a prime number.
