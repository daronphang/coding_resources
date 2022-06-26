## Higher-Order Components

An advanced technique for reusing component logic. HOCs are not part of React's API but more of a pattern. In essence, HOC is a function that takes a component and returns a new component. a HOC is a pure function with zero side-effects. Do not mutate the original component inside a HOC.

```javascript
import React from "react";

const higherOrderComponent = (WrappedComponent) => {
    class HOC extends React.Component {
        render() {
            return <WrappedComponent />;
        }
    }
    return HOC;
};

const SimpleHOC = higherOrderComponent(MyComponent);
```

### Conventions

```javascript
// wrapping display name for easy debugging

function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {
        /* ... */
    }
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithSubscription;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
```

### Loading Component Example

```javascript
//withdLoading.js
import React from "react";

function WithLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return <p>Hold on, fetching data might take some time.</p>;
    };
}
export default WithLoading;
```
