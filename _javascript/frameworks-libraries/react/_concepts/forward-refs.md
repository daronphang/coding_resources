## Forwarding Refs

References in React are used to store the reference to a DOM element i.e. button, input field. A technique for automatically passing a ref through a component to one of its children. For instance, forwardRefs can be useful when we want to programmatically focus an input element when the user clicks a button.

Ref prop only works on HTML elements, and not React components.

```js
// ref.current will point to the button DOM node
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

// child components can get a ref to the underlying button DOM
// and access it if necessary i.e. using a DOM button directly
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

```js
// functional components
import React, { useState, useRef, forwardRef } from "React";

const Input = forwardRef((props, ref) => {
    return <input ref={ref} {...props} />;
});

const App = () => {
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const onInputChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    const focus = () => {
        inputRef.current?.focus();
    };

    return (
        <>
            <Input value={value} onChange={onInputChange} ref={inputRef} />
            <button onClick={focus}>Focus</button>
        </>
    );
};
```
