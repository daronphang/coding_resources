### Regular Expressions
A regular expression is a pattern of characters used for matching character combinations in strings for text matching/searching/replacing. RegExp allows you to search texts in a pool of other texts. When searching for a text with RegExp, return is true or false. 

```js
let num = 1;
let regex = new RegExp('[0-9]');
console.log(regex.test(num));   // true

// using a regular expression literal
const regExp = /abc/;

const regex = new RegExp(/^a...s$/);  pattern is any 5 letter strings starting with a and ending with s
```

### Flags
Flags alter the behavior of RegEx. Appended to the end of RegEx literal or specified as second argument to regular expression.

```
g     Global, finds all matches for the given characters. Without this flag, only the first match is returned
i     Search is case-insensitive
s     Enables 'dotall' mode, that allows a dot . to match newline character \n
m     Multiline mode; ^ and $ are used to match the beginning and end of each line
u     Enables Unicode support
y     Sticky mode; finds all consecutive matches
```

### MetaCharacters
Characters that are interpreted in a special way by RegEx engine.
```
\w      Find a word character
\W      Find a non-word character
\d      Find a digit
\D      Find a non-digit character
\s      Find a whitespace character
\S      Find a non-whitespace character
\0      Find a NULL character
```

### Quantifiers
```
[].^S*+?{}()\|
```

```
[]          Specify a set of characters to match
.           Matches any single character except newline '\n'
^           Caret symbol used to check if a string starts with a certain character
$           Check if string ends with a certain character
*           Matches zero or more occurrences of pattern left to it
+           Matches one or more occurrences of pattern left to it
?           Matches zero or one occurrence of pattern left to it
```
```
[abc]
a           1 match
ac          2 matches
hey jude    No match
abc de ca   5 matches

ma*n
mn          1 match
mann        1 match
main        0 matches (a is not followed by n)
woman       1 match

ma+n
mn          0 matches
man         1 match
```

### RegEx Methods
```
exec()          Test for match in a string, returns the first match
test()          Test for match in a string, returns true or false
toString()
```

### Examples
```js
let str = 'We will, we will rock you';
str.match(/we/gi)   // ['We', 'we']
str.match(/hello/g)   // returns null, not an empty array
```
