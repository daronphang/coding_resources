### Python
Hexadecimal has base 16 and is represented with prefix 0x.
```py
# converting string to hexadecimal string
string = "DARONPHANG_B16A"
string_bytes = string.encode('utf-8')
string_hex_str = string_bytes.hex() 
print(string_hex)   # 4441524f4e5048414e475f42313641

hexa = int(string_hex_str, 16)
print(hex(hexa))    # 0x4441524f4e5048414e475f42313641
print(hex(123456))  # 0x1e240

add_oid = ['0x{}'.format(secrets.token_hex(7)) for item in range(len(payload['add_entries']))]

# 1 digit = 4 bits
# binary(8) = 8 bytes = 64 bits = 16 digits
```
