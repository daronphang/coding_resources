## Integers:
GO provides both signed and unsigned integer arithmetic.
```
int8 int16 int32 int64
uint8 uint16 uint32 uint64

RANGE OF VALUES
signed integers     -2^(n-1) to 2^(n-1)-1     int8 has -128 to 127
unsigned integers   0 to 2^n -1               int8 has 0 255, uses full range of bits for non-negative values 
```

## Binary Operators:
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

## Floating-Point Numbers:
GO provides float32 and float64.
```
float32   math.MaxFloat32 = 3.4e38    6 decimals
float64   math.MaxFloat64 = 1.8e308   15 decimals   Preferred usage
```
```GO
for x := 0; x < 8; x++ {
  fmt.Printf("x = %d e A = %8.3f\n", x, math.Exp(float64(x)))
}

// x = 0 e^x = 1.000
// x = 7 e^x = 1096.633
```

## Strings:
Immutable sequence of bytes. 
```GO
s := "hello, world"
fmt.Println(len(s))     // "12"
fmt.Println(s[0], s[7]) // "104 119"  ('h' and 'w')
```



## Useful Functions:
```
math.IsNaN()      Tests whether argument is not a number value
math.NaN()
