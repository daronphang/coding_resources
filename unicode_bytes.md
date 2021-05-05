## Unicode:
Univerval character standard that assigns a code to every character, number and symbol in every language in the world.  
i.e. Computer Hope is U+0043 U+006F U+006D U+0070 U+0075 U+0074 U+0065 U+0072 U+00A0 U+0048 U+006F U+0070 U+0065

### UTF Implementations:
To represent Unicode characters as binary data (raw 8-bit values).
```
UTF-8       Each symbol represented by 1-to-4 byte code. Stnadard encoding on web.
UTF-16      Fixed width encoding scheme in which each symbol is represented by two-byte code.
```

## Unicode vs ASCII:
ASCII is deisgned to represent basic English characters (128 characters). Uses one byte to represent each character.  
Unicode designed to support characters from all languages across the world (1,000,000 characters). Supports up to four bytes per character.


## Bytes:
Similar to strings (sequence of characters), byte is a sequence of bytes. Byte objects are machine readable, whereas Strings are human readable.
Can be used in applications that process pure ASCII instead of unicode text.
```
>>> b'\xcf\x84o\xcf\x81\xce\xbdo\xcf\x82'.decode('utf-16')
'蓏콯캁澽苏'
>>> b'\xcf\x84o\xcf\x81\xce\xbdo\xcf\x82'.decode('utf-8')
'τoρνoς'
```
## Python 3:
A string object is made up of Unicode characters. Each Unicode character is assigned a code point which can be expressed as a sequence of hex digits.
```python
stringobject = 'ant'    # unicode characters are a, n, t

stringobject = '\u0061\u006E\u0074'   # Unicode codepoints
stringobject
```
