## Iterators

An object which defines a sequence and potentially a return value upon its termination i.e. an object which implements the iterator protocol by having next() that returns an object with "value" and "done" properties; "done" returns true if last value in sequence has already been consumed.

Iterators are consumed only as necessary (on-demand) and hence, can express sequences of unlimited size.

## Generators

A generator is a function that can stop midway and then continue from where it was stopped i.e. can be exited and later re-entered. To create a generator, need special syntax construct function\*. Their context (variable bindings) will be saved across re-entrances. Returns a generator object/iterator with "value" and "done" properties. Can call next() whenever we want i.e. generator function has async flow with sychronous look.

Yield returns the value, pauses (saves state) and exits the function. Generator objects are one-time access only. Once yield, value is exhausted. Also, objects do not allow random access as they are generated one by one.

```js
function* generator(i) {
    yield i;
    yield i + 10;
}
const gen = generator(10);

console.log(gen.next()); // {value: 10, done: false}
console.log(gen.next()); // {value: 20, done: false}
console.log(gen.next()); // {value: undefined, done: true}
```

```js
function* generator() {
    const i = 1000;
    yield i;
    const result = yield i + 1;
    yield i + result;
}
const gen = generator();

console.log(gen.next()); // {value: 1000, done: false}
console.log(gen.next()); // {value: 1001, done: false}

// calling next() with arg will resume generator execution
// replaces yield expression where execution is paused
console.log(gen.next(3)); // {value: 1003, done: false}
console.log(gen.next()); // {value: undefined, done: true}
```

### Passing Values in Generators

Not only returns the result, but also can pass value inside the generator. Argument becomes result of yield.

```js
function* generatorFunction() {
    console.log(yield);
    console.log(yield);

    return "The end";
}

const generator = generatorFunction();

generator.next();
generator.next(100); // 100
generator.next(200); // 200
```

```js
function* gen() {
    let ask1 = yield "2 + 2 = ?";
    alert(ask1); // 4
    let ask2 = yield "3 * 3 = ?";
    alert(ask2); // 9
}
let generator = gen();

alert(generator.next().value); // "2 + 2 = ?"
alert(generator.next(4).value); // "3 * 3 = ?"
alert(generator.next(9).done); // true
```

### return

Can be used to terminate the generator at any point and ignore any other yield keywords. Useful in asynchronous programming when you need to make functions cancelable.

```js
function* generatorFunction() {
    yield "Neo";
    yield "Morpheus";
    yield "Trinity";
}

const generator = generatorFunction();
generator.next(); // {value: "Neo", done: false}
generator.return("There is no spoon!"); // {value: "There is no spoon!", done: true}
generator.next(); // {value: undefined, done: true}
```

### throw

Used with try-catch.

```js
function* generatorFunction() {
    try {
        yield "Neo";
        yield "Morpheus";
    } catch (error) {
        console.log(error);
    }
}

const generator = generatorFunction();
generator.next();
generator.throw(new Error("Agent Smith!"));
```

### Nested Generators (Delegation)

```js
function* delegate() {
    yield 3;
    yield 4;
}

// Outer generator function
function* begin() {
    yield 1;
    yield 2;
    yield* delegate();
}
```

## Async/Await with Generators

```js
const getUsers = asyncAlt(function* () {
    const response = yield fetch("https://jsonplaceholder.typicode.com/users");
    const json = yield response.json();

    return json;
});

getUsers().then((response) => console.log(response));

// Define a function named asyncAlt that takes a generator function as an argument
function asyncAlt(generatorFunction) {
    return function () {
        const generator = generatorFunction();
        function resolve(next) {
            // If the generator is closed and there are no more values to yield, resolve the last value
            if (next.done) {
                return Promise.resolve(next.value);
            }
            // If there are still values to yield, they are promises andmust be resolved.
            return Promise.resolve(next.value).then((response) => {
                return resolve(generator.next(response));
            });
        }
        return resolve(generator.next());
    };
}
```
