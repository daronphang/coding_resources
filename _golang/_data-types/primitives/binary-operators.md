## Binary Operators

```
&     bitwise AND
|     bitwise OR
^     bitwise XOR
&^    bit clear (AND NOT)
<<    Left shift, number of bit positions
>>    Right shift
```

```GO
var apples int32 = 1
var oranges int16 = 2
var compote int = apples + oranges // compile error

var compote = int(apples) + int(oranges)
```
