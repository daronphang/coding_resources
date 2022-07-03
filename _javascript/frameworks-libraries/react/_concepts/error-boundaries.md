## Error Boundaries

Error boundaries are React components that catch JS errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Only catch errors that occur in lifecycle method, render method, and inside Hooks like useEffect i.e. inside React parts.

Does not handle errors in:

-   Event handlers.
-   Asynchronous code.
-   Server-side rendering.
-   Errors thrown in error boundary itself.

Requires class component (currenly functional components are not able to implement error boundaries). Should have at least three methods:

1. A static method getDerivedStateFromError, used to update the error boundary's state.
2. A componentDidCatch lifecycle method used for performing operations when an error is caught.
3. A render method for rendering error boundary's child/fallback UI.

```js
import React from "react";

class MyErrorBoundaryExample extends React.Component {
    state = {
        error: null,
    };

    static getDerivedStateFromError(error) {
        // lifecycle method giving Error Boundary a chance to
        // update state and trigger a last render() showing fallback UI
        return { error: error };
    }

    componentDidCatch(error, info) {
        // Log the error to an error reporting service
        logErrorToExampleService(error, info);
    }

    render() {
        if (this.state.error) {
            // You can render any custom fallback UI
            return <p>Something broke</p>;
        }
        return this.props.children;
    }
}

export default MyErrorBoundaryExample;
```
