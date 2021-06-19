## Basics:
State management library built into React. Can use React hook or consumer to listen to contexts. 

```javascript
// store/auth-context.js
import React from 'react'; 

React.createContext({
  isLoggedIn: false   // if set default value, don't need provider, just use consumer
});

export default AuthContext; 


// app.js:

return (
  <React.Fragment>
  <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>    // to wrap everything with AuthContext as it is needed everywhere 
  ...
  </AuthContext.Provider> 
)

// navigation.js:

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
```
