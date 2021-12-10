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
Characters that are interpreted in a special way by RegEx engine. Uppercase denotes inverse class. 
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
Quantifier is appended to a character or a character class and specifies how many is needed.
```
[].^S*+?{}()\|
```
```
[]          Specify a set of characters to match
.           Matches any single character except newline '\n'
^           Anchor, caret symbol used to check if a string starts with a certain character
$           Anchor, check if string ends with a certain character
{n,m}       N denotes at least, m denotes at most; find sequence of characters
+           Shorthand for one or more {1,}
*           Shorthand for {0,}
?           Shorthand for {0, 1}, makes symbol optional 
  
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

let str = 'I am 12345 years old, not 123 years old';
str.match(/\d{5}/)  // 12345, same as /\d\d\d\d\d/
str.match(/\d{4,6}/)  // 12345, find numbers between 4-6 digits
// {3,} denotes digits of length 3 or more

let str = '+7(903)-123-45-67';
str.match(/\d/g)      // [7, 9, 0 , 3, 1, 2, 3, 4, 5, 6, 7]
str.match(/\d{1,}/)   // [7, 903, 123, 45, 67]

let str = 'issit color or colour';
str.match(/colou?r/g)   // makes 'u' optional, returning color, colour

const regex = new RegExp(/^a...s$/);
console.log(regex.test('alias'));   // true

let str = 
`
1st place
2nd place
3rd place
`
console.log(str.match(/^\d/gm)  // 1, 2, 3
```
