## Authentication:
```javascript
// auth-component.ts:

let authObs: Observable<AuthResponseData>;    // AuthResponseData is an interface imported

signIn() {
  this.isLoading = true;
  authObs = this.authService.login(email, password)
  
  authObs.subscribe(some function, error => console.error(error))
}

```
