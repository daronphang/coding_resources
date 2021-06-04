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
## Reflecting Auth State in UI:
```javascript
// header.component.ts

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
}


  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    }
  }
 
 ngOnDestroy() {
  this.userSub.unsubscribe();
}

// header.html:
// add #ngIf="isAuthenticated"
```
## Send Tokens On-Demand:
```javascript
someFunction() {
  return this.authService.user.pipe(take(1), exhaustMap(user => {  // take() takes first observable and auto unsubscribe
    return this.http.get('https://', {params: newHttpParms().set('auth', user.token)})  // exhaustMap() replaces user observable with new one
  })
}


```
