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

## Storing Users:
```javascript
// user.model.ts:
export class User {
  constructor(
    public: email: string;
    public: id: string;
    private _token: string,
    private _tokenExpirationDate: Date
  )  {}
  
  get token() {
    if(!_tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

// auth.service.ts:
user = new Subject<User>();   // User is an interface imported

signIn(){
  // some code that returns an observable
  .pipe(
    catchError(this.handleError),
    tap(resData => {handleAuth(resData.email, resData.password, resData.idToken)
    );
    }
  );
}

private handleAuth(email, string, expiresIn) {
  const loggedUser = new User(
  email,
  password,
  idToken
 );
 this.user.next(loggedUser);
}


```
