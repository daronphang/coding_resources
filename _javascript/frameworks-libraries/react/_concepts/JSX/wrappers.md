## Wrapper/Fragment Component

JSX requires one root element that return a constant or variable. Can create your own or use <React.Fragment> or <> (empty).

```javascript
// helper/wrapper.js
const Wrapper = (props) => {
    return props.children; // return content between <wrapper></wrapper>
};

export default Wrapper;
```

```javascript
// Fragments
return (
    <React.Fragment>
        <h2>hi</h2>
        <p>this works</p>
    </React.Fragment>
);

return (
    <>
        <h2>hi</h2>
        <p>this works</p>
    </>
);
```
