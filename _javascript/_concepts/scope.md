### Scope

Scope is the context in which a variable exists; can be local or global. Scioe controls the visibility and lifetime of variables. Important service as it reduces naming collisions and provides automatic memory management. Assignments are not scoped. Variables can be declared in two ways:

1. Using VAR which is function scoped.
2. Using LET and CONST (ES6) which are block scoped {} i.e. within loops, conditionals (for, while, if, switch).
3. LET allows mutation while CONST doesn't.
4. For VAR, will result in undefined if referenced before declaration.
5. For LET and CONST, stay uninitialized (ReferenceError) until declared (ensures variables are declared first).

```javascript
(function () {
    //IIFE
    console.log(hero); //ReferenceError and not undefined as variable has to be declared first though hoisted
    let hero = "Atom";
})();
```

```javascript
var hero = "Batman";
let antiHero = "Captain Cold";
if (true) {
    var hero = "The Flash"; //scope is global as this is declared in block and not function
    let antiHero = "Reverse Flash"; //scope is (local) block-level
    console.log(hero); //The Flash
    console.log(antiHero); //Reverse Flash
}
console.log(hero); //The Flash
console.log(antiHero); //Captain Cold
```
