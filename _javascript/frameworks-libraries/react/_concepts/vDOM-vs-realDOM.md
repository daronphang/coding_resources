## DOM Inefficiency

DOM was originally inteded for static UIs i.e. pages rendered by the server that don't required dynamic updates. When the DOM updates, it has to update the node as well as re-paint the page with its corresponding CSS and layout. This can be very expensive when you have many nodes.

## Checking for Changes

### Dirty Checking (Slow)

Involves tranversing through each node down the DOM tree which is very inefficient.

### Observable (Fast)

Components are responsible for listening to when an update takes place. As the data is saved on the state, components can simply listen to events on the state and if there is an update, it can re-render to the UI. React uses it.

## Virtual DOM

The vDOM is a light-weight abstraction of the DOM that has all the same properties as the real DOM, but doesn't have the ability to write to the screen. A new vDOM is created after every re-render.

-   **Reconciliation** is a process to compare and keep in sync the two files (real and virtual DOMs).
-   **Diffing algorithm** is a technique of reconciiliation which is used by React.

## How Updates Work

1. On first load, ReactDOM.render() creates the vDOM and realDOM trees.
2. When any event (keypress, click) occurs, vDOM tree nodes are notified for props change. If the properties are updated, the node gets updated.
3. React compares vDOM with real DOM and updates real DOM through reconciliation.
4. Real DOM is then repainted on the browser.
