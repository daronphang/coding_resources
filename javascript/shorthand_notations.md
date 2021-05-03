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

