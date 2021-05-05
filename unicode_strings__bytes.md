## History:
Characters were represented with 8 bits (1 byte) of memory. A bit a single binary digit that can represent 0 or 1. 1 byte can have 255 different combinations of binary.
```
01100010 01101001 01110100 01110011
b        i        t        s

# word 'bits' is equivalent to 4 bytes or 2^32.
```

## ASCII:
The first character set of encoding standard between computers on the internet. 128 characters containing 0-9, A-Z in upper and lower case, and some special characters. Each character is represented by a number between 32-127. Each character requires 7 bits. Character sets used in modern computers and HTML are based on ASCII.
```
Dec	Hex	Binary    HTML	Char
48	30	00110000  &#48;	0	
49	31	00110001  &#49;	1
50	32	00110010  &#50;	2	
51	33	00110011  &#51;	3
65	41	01000001  &#65;	A	 
66	42	01000010  &#66;	B	 
67	43	01000011  &#67;	C	 
68	44	01000100  &#68;	D	
```

## Unicode:
Univerval character standard that assigns a codepoint to every character, number and symbol in every language in the world. Unicode characters can be referenced 
by their codepoint. Has backwards compatability with ASCII.
i.e. Computer Hope is U+0043 U+006F U+006D U+0070 U+0075 U+0074 U+0065 U+0072 U+00A0 U+0048 U+006F U+0070 U+0065

### Unicode Transformation Format:
To represent Unicode characters as binary data (raw 8-bit values).
```
UTF-8       Each symbol represented by 1-to-4 bytes code. Standard encoding on web.
UTF-16      Fixed width encoding scheme in which each symbol is represented by two-byte code.

# For UTF-8, codepoints are the same as ASCII for the first 128 characters and each uses 1 byte.
```

## Bytes:
Similar to strings (sequence of characters), byte is a sequence of bytes. Byte objects are machine readable and can be saved into memory, whereas Strings are human readable.
Can be used in applications that process pure ASCII instead of unicode text.
```
>>> b'\xcf\x84o\xcf\x81\xce\xbdo\xcf\x82'.decode('utf-16')
'蓏콯캁澽苏'
>>> b'\xcf\x84o\xcf\x81\xce\xbdo\xcf\x82'.decode('utf-8')
'τoρνoς'
```

## Encoding & Decoding:
```
encode('utf-8')     convert str into bytes
decode('utf-8')     convert bytes into str
```

## Unicode vs ASCII:
ASCII is deisgned to represent basic English characters (128 characters). Uses one byte to represent each character.  
Unicode designed to support characters from all languages across the world (1,000,000 characters). Supports up to four bytes per character.

## Python 3:
A string object is made up of Unicode characters. Each Unicode character is assigned a code point which can be expressed as a sequence of hex digits.
```python
stringobject = 'ant'    # unicode characters are a, n, t

stringobject = '\u0061\u006E\u0074'   # Unicode codepoints, a hexadecimal number 
stringobject
```

## Reading Weird Characters:
The editor/browser that's trying to read the document is assuming the wrong encoding.
