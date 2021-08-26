## Looping Elements in Array:
Can either push items to an array and render in JSX or render JSX object directly.

```js
const items = [];
const itemsArray = [{description: 'testing23232222', price: 12.55}, {description: 'testing22323', price: 50.00}];

// rendering through an array
const itemsRendered = itemsArray.forEach(item => items.push(<ItemCartComponent description={item.description} price={item.price} />));

// render JSX element directly; cannot put {} inside callback function
const itemsRendered = itemsArray.forEach(item => <ItemCartComponent description={item.description} price={item.price} />);

return (
  {items}
  {itemsRendered}
)
```
