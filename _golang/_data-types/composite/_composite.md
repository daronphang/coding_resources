## Basics

Arrays and structs are aggregate types whereby their values are concatenations of other values in memory. Arrays are homogeneous (all elements have same type) while structs are heterogeneous. Both arrays and structs are fixed size as compared to slices and maps which cater for dynamic data structures.

## Structs vs Maps

| Map                                                                | Structs                                               |
| ------------------------------------------------------------------ | ----------------------------------------------------- |
| All keys must be the same type and all values must be of same type | Values can be of different type                       |
| Keys are indexed and can be iterated                               | Keys don't support indexing                           |
| Reference type                                                     | Value type and must use pointers to update values     |
| Don't need to know all keys at compile time                        | Need to know all different fields at compile time     |
| Used to represent a collection of related properties               | Used to represent an object with different properties |
