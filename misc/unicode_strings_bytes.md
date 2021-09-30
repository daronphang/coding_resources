## History:
Characters in computer were represented with 8 bits (1 byte) of memory. A bit a single binary digit that can represent 0 or 1. 1 byte can have 255 different combinations of binary (255 different numbers).
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

# Example of 7 bits
64 32 16 8 4 2 1 

'B' = 66 = 64+2 = 1000010 = 01000010 (8 bits)
```
As ASCII characters utilize 7 bits, there are still 127 more combinations to be represented; this gave birth to extended ASCII. However, different organizations
came up with their own variants; this led to conflicted character encodings, and each extended ASCII was platform dependent.

## Unicode:
Universal character standard that assigns a codepoint to every character, number and symbol in every language in the world. Unicode characters can be referenced 
by their codepoint. Has backwards compatability with ASCII. Total of 143,859 characters.
```
# U+<hex-code> from U+0000 to U+10FFFF
Computer Hope
U+0043 U+006F U+006D U+0070 U+0075 U+0074 U+0065 U+0072 U+00A0 U+0048 U+006F U+0070 U+0065

# First 128 characters of Unicode are the same as ASCII characte set
Unicode ASCII Char
U+0041	65    A
U+0042	66    B
U+0043	67    C
U+0044	68    D
U+0045	69    E

# Unicode uses hexadecimal base 
```

### Unicode Transformation Format:
Problem with Unicode is that to represent 100,000 characters (or 100,000 numbers equivalent), need 32 bits per character. However, first 128 characters of ASCII
need only 7 bits. To eliminate wastage, different UTF encodings were introduced. To represent Unicode characters as binary data (raw 8-bit values).
```
UTF-8       Each symbol represented by 1-to-4 bytes code. Standard encoding on web.
UTF-16      Fixed width encoding scheme in which each symbol is represented by two-byte code.

# Without UTF-8, the character 'A' would be:
00000000 00000000 00000000 001000001

# With UTF-8:       
1-byte:  0XXXXXXX                       # UTF-8 extracts the X only
2-bytes: 110XXXXX 10XXXXXX              # Above 128 ASCII character, '10' in second byte represents continuation
3-bytes: 1110XXXX 10XXXXXX 10XXXXXX

# Examples:
Char Dec Unicode UTF-8             Binary 
ç    231 U+0347  11000011 10100111 00011100111 = 11100111
ã    227 U+0343  11000011 10100011 00011100011 = 11100011
```

### Unicode Encoding & Decoding:
```
encode('utf-8')     convert str into bytes
decode('utf-8')     convert bytes into str
```

## Unicode vs ASCII:
ASCII is deisgned to represent basic English characters (128 characters). Uses one byte to represent each character.  
Unicode designed to support characters from all languages across the world (1,000,000 characters). Supports up to four bytes per character.

## Python 3:
A string object is made up of Unicode characters that is only human readable. Each Unicode character is assigned a code point which can be expressed as a sequence of hex digits.  
A byte object is a sequence of bytes. Machine readable and can be saved into memory. Can be used in applications that process pure ASCII instead of unicode text.
```python
stringobject = 'ant'    # unicode characters are a, n, t

stringobject = '\u0061\u006E\u0074'   # Unicode codepoints, a hexadecimal number 

>>> b'\xcf\x84o\xcf\x81\xce\xbdo\xcf\x82'.decode('utf-16')
'蓏콯캁澽苏'
>>> b'\xcf\x84o\xcf\x81\xce\xbdo\xcf\x82'.decode('utf-8')
'τoρνoς'
```

## Reading Weird Characters:
The editor/browser that's trying to read the document is assuming the wrong encoding.
