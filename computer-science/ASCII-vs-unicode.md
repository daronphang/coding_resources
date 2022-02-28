### Bytes and Bits (Base2)

Bit is a single binary digit that is atomic and is smallest unit of storage, either 0 or 1.

Byte is the basic unit of information in computer storage and processing. Characters in computer are represented with 8 bits (one byte) of memory. One byte can have 256 different combinations of binary. The string of bits making up a byte is processed as a unit by a computer i.e. bytes are smallest operable units of storage in computer technology.

### Decimal (Base10)

Number system that is represented with 10 unique digits.

### HEX (Base16)

Uses a set of 16 unique digits. Uses standard 0-9 and A-F. Provides a human-friendly representation of binary-coded values. Each hexadecimal digit represents 4 bits.

```
00000000
11111111      Can re presented as 00 or FF in hexadecimal
```

```
Dec   Hex   Binary
2     2     10
10    A     1010
17    11    10001
37    25    100101
```

### ASCII

The first character set of encoding standard between computers on the internet. 128 characters containing 0-9, A-Z in upper and lower case, and some special characters. Each character is represented by a number between 32-127. Each character requires 7 bits. Character sets used in modern computers and HTML are based on ASCII.

As ASCII characters utilize 7 bits, there are still 127 more combinations to be represented; this gave birth to extended ASCII. However, different organizations came up with their own variants; this led to conflicted character encodings, and each extended ASCII was platform dependent.

```
Dec	Hex	Binary    HTML	Char
00  00  00000000  &#0   Null
01  01  00000001  &#1   SOH
42  2A  00101010  &#42  *
48	30	00110000  &#48;	0
49	31	00110001  &#49;	1
50	32	00110010  &#50;	2
51	33	00110011  &#51;	3
65	41	01000001  &#65;	A
66	42	01000010  &#66;	B
67	43	01000011  &#67;	C
68	44	01000100  &#68;	D
```

#### Example (Character B)

To represent a character in binary, simply work in base2.

```
Character B = 66 = 64 + 2 = 01000000 + 00000010 = 01000010
```

```
Power   Base2   Binary
0       1       00000000
1       2       00000010
2       4       00000100
3       8       00001000
4       16      00010000
5       32      00100000
6       64      01000000
7       128     10000000
8       255     11111111
```

### Unicode

Universal character standard that assigns a codepoint to every character, number and symbol in every language in the world. Unicode characters can be referenced by their codepoint. Has backwards compatability with ASCII. Total of 143,859 characters.

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

#### Unicode Transformation Format

Problem with Unicode is that to represent 100,000 characters (or 100,000 numbers equivalent), need 32 bits per character. However, first 128 characters of ASCII need only 7 bits. To eliminate wastage, different UTF encodings were introduced. To represent Unicode characters as binary data (raw 8-bit values).

Without UTF formatting, character A would be equivalent to:
00000000 00000000 00000000 001000001

```
UTF-8       Each symbol represented by 1-to-4 bytes code. Standard encoding on web.
UTF-16      Fixed width encoding scheme in which each symbol is represented by two-byte code.
```

#### UTF-8

World Wide Web's most common character encoding. Each character is represented by one to four bytes (32 bits) and has backwards compatibility with ASCII. Leading bits of bytes contain metadata.For instance, two-byte UTF-8 representation:

- First byte has 110; 11 indicates two-byte sequence, 0 indicates code bits will follow.
- Second byte has 10: signals that it is a continuation in UTF-8 sequence.

```
One-byte        0XXXXXXX                For first 128 ASCII characters
Two-bytes       110XXXXX 10XXXXXX
Three-bytes     1110XXXX 10XXXXXX 10XXXXXX
```

```
Char Dec Unicode UTF-8             Binary
ç    231 U+0347  11000011 10100111 00011100111 = 11100111
ã    227 U+0343  11000011 10100011 00011100011 = 11100011
```

### Unicode vs ASCII

ASCII is deisgned to represent basic English characters (128 characters). Uses one byte to represent each character.  
Unicode designed to support characters from all languages across the world (1,000,000 characters). Supports up to four bytes per character.

### Base64 vs HEX (Base16)

different ways of representing bytes (binary). HEX takes 2 characters for each byte while Base64 takes 4 characters for every 3 bytes and hence, it is more efficient i.e. 100K file will take 200K to encode in HEX and 133K in Base64.

### Reading Weird Characters

The editor/browser that's trying to read the document is assuming the wrong encoding.
