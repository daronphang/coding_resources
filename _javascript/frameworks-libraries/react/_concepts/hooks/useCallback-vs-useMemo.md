## UseCallback

Primary function is to avoid unnecessary re-renders to make app more efficient. Receives a function as a parameter and an array of dependencies; it will return a memoized version of callback and it will only change if the dependencies change.

## UseMemo

Similar to useCallback() but allows you to apply memoization to any value type and not just functions.

```js
const initialCandies = ["snickers", "skittles", "twix", "milky way"];

// prevent re-rendering of array
const initialCandies = React.useMemo(() => ["snickers", "skittles", "twix", "milky way"], []);
```

## useMemo vs useCallback

Optimization comes at a cost. Sometimes using useCallback() or useMemo() would make performance worse by preventing dependencies and memoized values from being garbage collected (frees up memory space).
Most of the time shouldn't bother optimizing unnecessary re-renders as React is very fast. however, there are situations when rendering takes substantial amount of time such as graphs/charts/animations.

Factors to consider:

-   Referential Equality.
-   Computationally expensive calculations.

When defining an object inside functional components, it is not going to be referentially equal to last time that same object was defined (even with same properties/values). Important when considering dependencies lists.

https://kentcdodds.com/blog/usememo-and-usecallback

```js
true === true // true
false === false // true
1 === 1 // true
'a' === 'a' // true

{} === {} // false
[] === [] // false
() => {} === () => {} // false

const z = {}
z === z // true
```

```js
function Foo({ bar, baz }) {
    React.useEffect(() => {
        const options = { bar, baz };
        buzz(options);
    }, [bar, baz]);
    return <div>foobar</div>;
}

function Blub() {
    const bar = React.useCallback(() => {}, []);
    const baz = React.useMemo(() => [1, 2, 3], []);
    return <Foo bar={bar} baz={baz} />;
}
```
