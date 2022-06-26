## Rendering Elements

Unlike browser DOM elements, React elements are plain objects and are cheap to create. React DOM takes care of updating the actual DOM to match the React elements.

Applications built with just React will have a single root DOM node which is managed by React DOM. If React is integrated into an existing app, may have multiple isolated root DOM nodes.

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <h1>Hello, world</h1>;
root.render(element);
```

### Updating Elements (States)

React elements are immutable and once created, you can't change its children or attributes unless you call root.render() again. Instead, this is modified through states. State is similar to props, but it is private and fully controlled by the component.

React DOM compares the element and its children to the previous one, and only applies DOM updates necessary to bring the DOM to the desired state.
