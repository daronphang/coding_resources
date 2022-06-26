### Looping Elements in Array

1. Push items to an array and render in JSX.
2. Render JSX element directly using map().

```js
const items = [];
const itemsArray = [{title: 'test1', price: 12.55}, {title: 'test2', price: 50.00}];

// rendering through an array
const itemsRendered = itemsArray.forEach(
  item => items.push(<ItemCartComponent title={item.title} price={item.price} />)
);

// render JSX element directly; cannot put {} inside callback function
const itemsRendered = itemsArray.map(
  item => <ItemCartComponent title={item.title} price={item.price} />
);

return (
  {items}
  {itemsRendered}
)
```

### Conditional Rendering

Use short circuiting and useState from React Hook.

```js
import React from "react";
import LoginComponent from "./login";

export default function HomeComponent() {
  const [showLogin, setShowLogin] = React.useState(false);
  const handleLoginComponent = () => {
    setShowLogin(true);
  };

  return <React.Fragment>{showLogin && <LoginComponent />}</React.Fragment>;
}
```
