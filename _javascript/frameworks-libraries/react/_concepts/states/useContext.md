## useContext

State management library built into React to solve props drilling. Provides a way to pass data through component tree without having to pass props down manually at every level. Designed to share data that can be considered "global" for a tree of React components such as current authenticated user, theme, or preferred language. Allows you to broadcast such data and changes to it, to all components nested below. Need create context, consumer and provider.

### Limitations

-   Not optimized for high frequency changes i.e. many changes per second.
-   Should not be used to replace ALL communications via props.
-   Apply sparingly as it increases complexity for higher level components and unit-testing.

### IMPORTANT

When the state of Context Provider changes, it will cause all its consumers to re-render and setState values will be lost. Nonetheless, it does not trigger re-render for all children of the Provider, but only those that useContext(). To preserve state:

```js
let errorMessage; // preserve state when component re-renders

export default function ExampleComponent() {
    const ctx = useContext(Test);
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        ctx.test("update state in context provider");
        setErrMsg("hello world"); // this state will get lost when context provider re-renders consumers
    }, []);
}

useEffect(() => {
    if (!errMsg) errorMessage = null;
    else errorMessage = "hello world!"; // this state gets preserved upon re-render
}, [errMsg]);
```

## Context

When React renders a component that subscribes to this Context object, it will read the current value from the closest matching Provider above it in the tree. Default value is only used when a component does not have a matching Provider above it in the tree i.e. useful for testing components in isolation without wrapping them. Passing undefined as a Provider value does not cause consuming components to use default.

To update context from a nested component, can pass a function down to allow consumers to trigger an update.

```js
// UserContext.js
// Returns a consumer and provider
export const UserContext = React.createContext({
    name: null,
    age: null,
    happyBirthday: () => {},
});

export default UserContext;
```

## Provider

Allows consuming components to subscribe to context changes. All consumers that are descendants of a Provider will re-render whenever the Provider's value prop changes.

```js
// UserProvider.js
import UserContext from "./context";

export default function UserProvider({ children }) {
    const [name, setName] = useState("John Doe");
    const [age, setAge] = useState(1);
    const happyBirthday = () => setAge(age + 1);

    return <UserContext.Provider value={{ name, age, happyBirthday }}>{children}</UserContext.Provider>;
}
```

## Consumer

Consumer is where the stored information ends up. It can request data via the provider and manipulate the central store.

## useContext

React Hook that allows us to manage state data inside functional components. Provides cleaner code than Consumer component.

### Example

```javascript
// store/auth-context.js
// equivalent to store method of Redux
// all logic goes in here

import React, { useState } from 'react';

// creating context for authenticated user, value passed in is default
const AuthContext = React.createContext({
  isLoggedIn: false,   // to set default value
  onLogout: () => {},    // pass dummy function for IDE auto completion
  onLogin: (email, password) => {}
});

// to have one central place for state management
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    localStorage.setItem('userData', 'test');
    setIsLoggedIn(true);
  }


  return (
      <AuthContext.Provider value={{      // to wrap everything with AuthContext as it is needed everywhere
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}>{props.children}
    </AuthContext.Provider>;
  )

}

export default AuthContext;
```

```javascript
// index.js

ReactDOM.render(<AuthContextProvider><App /></AuthContextProvider>, ...)

```

```javascript
// navigation.js:
import React from 'react';

const Navigation = () => {    // don't need pass props as argument
  return (
    <AuthContext.Consumer>
    {(ctx) => {
      return (
        ...place code here
        ctx.isLoggedIn
      )
    }}

    </AuthContext.Consumer>
  )
}
```

```javascript
// navigation.js:
// using useContext:
import React from 'react';

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
  ...place code here
  ctx.isLoggedIn

  <button onClick={ctx.onLogout}>Logout</button>
  )
}

```
