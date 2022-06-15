## Floating-Point Numbers

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
