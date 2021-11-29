## Python:
Hexadecimal has base 16 and is represented with prefix 0x.
```py
# converting string to hexadecimal string
string = "DARONPHANG_B16A"
string_bytes = string.encode('utf-8')
string_hex_str = string_bytes.hex() 
print(string_hex)   # 4441524f4e5048414e475f42313641

hexa = int(string_hex_str, 16)
print(hex(hexa))  # 0x4441524f4e5048414e475f42313641
```
