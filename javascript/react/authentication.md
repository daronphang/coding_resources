## Adding Auth Guards:
```javascript
return (
  {!auth.ctx.isLoggedIn && (<Route path='/auth'><AuthPage /></Route>)}
  {authctx.isLoggedIn && (<Route path='/home'><Home /></Route>)}
  <Route path='*'><Redirect to='/'</Route>    // or render error page
)
```
