## Basics:
State management library built into React to solve props drilling. Need create context, consumer and provider.

### Consumer: 
Consumer is where the stored information ends up. It can request data via the provider and manipulate the central store.

### Provider:
Acts as a delivery service. When a consumer asks for something, it finds it in the conext and delivers it to where it's needed. 

### useContext:
React Hook that allows us to manage state data inside functional components. Provides cleaner code than Consumer component.

### Limitations:
- Not optimized for high frequency changes i.e. many changes per second.
- Should not be used to replace ALL communications via props.


```javascript
// store/auth-context.js
// equivalent to store method of Redux
// all logic goes in here

import React, { useState } from 'react'; 

const AuthContext = React.createContext({
  isLoggedIn: false,   // to set default value
  onLogout: () => {},    // pass dummy function for IDE auto completion
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {     // to have one central place for state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
  }
  
  const loginHandler = () => {
    localStorage.setItem('userData', 'test');
    setIsLoggedIn(true);
  }
  
  return <AuthContext.Provider value={{     // to wrap everything with AuthContext as it is needed everywhere 
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler
    }}>{props.children}</AuthContext.Provider>;
}

export default AuthContext; 
```

```javascript
// index.js

ReactDOM.render(<AuthContextPRovider><App /></AuthContextProvider>, ...)

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
