## Adding Auth Guards:
```javascript
return (
  {!auth.ctx.isLoggedIn && (<Route path='/auth'><AuthPage /></Route>)}
  <Route path='/home'>{authctx.isLoggedIn && <Home />}</Route>)}
  <Route path='*'><Redirect to='/error'</Route>    // or redirect to home page
)
```
