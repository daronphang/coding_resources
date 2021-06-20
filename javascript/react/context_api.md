## Basics:
State management library built into React to solve props drilling. Need create context, consumer and provider.

### Consumer: 
Consumer is where the stored information ends up. It can request data via the provider and manipulate the central store.

### Provider:
Acts as a delivery service. When a consumer asks for something, it finds it in the conext and delivers it to where it's needed. 

### useContext:
React Hook that allows us to manage state data inside functional components. Provides cleaner code than Consumer component.


```javascript
// store/auth-context.js
// equivalent to store method of Redux
import React from 'react'; 

React.createContext({
  isLoggedIn: false   // to set default value
});

export default AuthContext; 
```

```javascript
// app.js:

const logoutHandler = () => {
  localStorage.removeItem('userData');
  setIsLoggedIn(false);
};

return (
  <React.Fragment>
  <AuthContext.Provider value={{    // to wrap everything with AuthContext as it is needed everywhere 
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler     // dynamic context
  }}
  >    
  ...
  </AuthContext.Provider> 
)
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
