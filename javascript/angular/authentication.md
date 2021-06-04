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
Can use interceptor to add token to every outgoing requests.
```javascript
// interceptor.service.ts:

import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpHandler, HttpParams, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './authservice';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class AuthInterceptorService implements HttpInterceptor {

  constructor(authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {return next.handle(req);}
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
        return next.handle(modifiedReq);
      })
    )
  }
}
```
