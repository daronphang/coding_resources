## JSX

Template language that comes with the full power of JS. React separates concerns with loosely coupled components that contain both markup and logic in the same file. Doesn't require using JSX but it is useful when working with UI inside JS code. Able to put any valid JS expression inside JSX, and JSX become regular JS function calls after compilation i.e. can return JSX from functions.

Do not put quotes around curly braces when embedding JS expression inside an attribute i.e. quotes for string, curly for expressions, but not both in the same attribute.

JSX prevents injection attacks (XSS) as it escapes any values embedded in JSX before rendering them i.e. cannot inject anything that's not explicitly written in your app as everything is converted to a string before being rendered.

```js
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;
const element = <a href="https://www.reactjs.org"> link </a>;

// return JSX from function calls
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}
```

### Syntactic Sugar

JSX just provides syntactic sugar for React.createElement function.

```js
// JSX
<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>;

// Compiles into
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me");
```
