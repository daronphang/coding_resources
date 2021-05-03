## Shorthand Notations:
### Ternary Operator:
```javascript
const x = 20;
let answer;

if (x > 10) {
    answer = "greater than 10";
} else {
    answer =  "less than 10";
}

\\ Shorthand
const answer = x > 10 ? "greater than 10" : "less than 10";

\\ Nested if
const answer = x > 10 ? "greater than 10" : x < 5 ? "less than 5" : "between 5 and 10";
```
### Short-Circuit Evaluation:
When assigning a variable value to another variable, you may want to ensure that the source variable is not null, undefined, or empty. You can either write a long if statement with multiple conditionals, or use a short-circuit evaluation.
```javascript
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}

\\ Shorthand
const variable2 = variable1  || 'new';
```
### Declaring Variables:
```javascript
let x;
let y;
let z = 3;

\\ Shorthand
let x, y, z=3;
```
### If Presence:
```javascript
if (likeJavaScript === true)

\\ Shorthand
if (likeJavaScript) or if (!likeJavaScript) \\ latter for checking if false
```
### For Loop:
```javascript
const fruits = ['mango', 'peach', 'banana'];
for (let i = 0; i < fruits.length; i++)

\\ Shorthand
for (let fruit of fruits)

\\ Accessing index only
for (let index in fruits)

\\ Accessing keys in dictionaries
const obj = {continent: 'Africa', country: 'Kenya', city: 'Nairobi'}
for (let key in obj)
  console.log(key) // output: continent, country, city
```













