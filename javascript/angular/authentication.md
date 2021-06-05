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
```
```javascript
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

private handleAuth(email, id, token, expirationDate) {
  const loggedUser = new User(
  email,
  id,
  _token,
  _tokenExpirationDate
 );
 this.user.next(loggedUser);
 localStorage.setItem('userData', Json.stringify(loggedUser));    // store token in browser storage 
}

autoLogin() {       // call this function in ngOnInit from component.ts
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData) {
  return;
  }
  
  const loadedUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate) 
  if(loadedUser.token) (
    this.user.next(loadedUser);
  }
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
Can use interceptor to attach authentication information such as tokens to requests.
```javascript
// app.module.ts:
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})

// auth-interceptor.service.ts:

import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpHandler, HttpParams, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './authservice';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class AuthInterceptorService implements HttpInterceptor {

  constructor(authService: AuthService) {}
  
  const newParams = new HttpParams().set('auth', user.token);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {return next.handle(req);}
        else {
          const modifiedReq = req.clone({params: newParams })
          // can check if error.status === 401 and redirect if true
          
          return next.handle(modifiedReq);
        }
      })
    )
  }
}

// app.module.ts:
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { TokenInterceptor } from './../auth/token.interceptor'; 

@NgModule({
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}]
})
```
```javascript
const newParams = new HttpParams().set('token', '123abc').set('name', ' john')   // example/?api=123abc&?name=john
const newHeaders = new HttpHeaders().set('Authorization', 'my-auth-token')

(params: newParams}
{headers: newHeaders}
{setHeaders: {'Authentication': 'auth-token', 'Content-Type': 'application/json'}}
```
