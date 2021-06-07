## Authentication:
```javascript
// auth.service.ts:
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, of } from 'rxjs';
import {catchError, tap, take, map } from 'rxjs/operators';

import { UserLoginRequest, AuthResponse } from '../interface';
import { UserModel } from '../model';
import { Router } from '@angular/router';
// import { AuthComponent } from '../components/auth/auth.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated: boolean = false;   // property used across all components

  searchValue: string = "no search was submitted";  // testing purposes

  public userSub = new BehaviorSubject<any>(null);  // observable that is subscribed for all authentication requests

  authenticateUser(email: string, password: string) {
    let userLogin: UserLoginRequest = {email: email, password: password, returnSecureToken: true};
    let authResponse = this.http.post<AuthResponse>(   // response of type AuthResponse
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3yAo0iKig6zPAbmjXvOsiHu-NLaeN34Q',
      userLogin
      );

    return authResponse.pipe(
      catchError(error => this.handleError(error)),
      tap(resData => {
        if (resData.registered) {   // To modify based on auth response
          this.isAuthenticated = true;
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const storedUser = new UserModel(resData.email, resData.idToken, expirationDate);   // user data stored for future requests
          this.userSub.next(storedUser);  // if user is authenticated, will push storedUser that can be subscribed, else will be null
          localStorage.setItem('userData', JSON.stringify(storedUser));   // to store userData in browser local storage
        } 
      })
    )
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
      }
    switch (errorRes.error.error.message) {
      case 'INVALID_EMAIL':
        errorMsg = 'Email does not exist. Please try again.';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Password is incorrect. Please try again.';
        break;
      case 'INVALID_IDP_RESPONSE':
        errorMsg = 'Auth token is invalid. Please login again.'
      }
    return throwError(errorMsg);
  }

  onLogout(){
    this.userSub.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(['/auth']);
  }

  autoLogin() {   // if user refreshes page or closes browser; to be executed in ngOnInit() for all components
    let checkUser = localStorage.getItem('userData');
    if (!checkUser) {
      this.userSub.next(null);
    } else {
      checkUser = JSON.parse(checkUser);
      this.userSub.next(checkUser);
    }
  }

}



```

## Storing Users for Auto Login/Logout:
```javascript
// user.model.ts:
export class User {
  constructor(
    public: email: string;
    public: id: string;
    private _token: string,
    private _tokenExpirationDate: Date
  )  {}
  
  get token() {     // when accessing User._token, will auto call this getter method
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
  email, string,
  userId: string,
  token: string,
  expiresIn: number
 );
 this.user.next(loggedUser);
 this.autoLogout(expiresIn * 1000)
 localStorage.setItem('userData', Json.stringify(loggedUser));    // store token in browser storage 
}

logout() {
  this.user.next(null);
  this.router.navigate(['/auth']);
  localStorage.removeItem('userData');   // as opposed to localStorage.clear()
  if (this.tokenExpirationTimer) {
    clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = null;
}

autoLogout(expirationDuration: number) {
  this.tokenExpirationTimer = setTimeout(() =>{
  this.logout();
  }, expirationDuration);

}

autoLogin() {       // call this function in ngOnInit from component.ts
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData) {
  return;
  }
  
  const loadedUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate) 
  if(loadedUser.token) (
    this.user.next(loadedUser);
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime())
    this.autoLogout(expirationDuration);
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
## Guards:
Implements a CanActivate function that checks whether the current user has permission to activate the requested route.
```javascript
// routing-service:
const appRoutes: Routes = [
  {path: 'users/:id/:name', canActivate: [AuthGuard], component: UserComponent},     // takes an array of all guard services
]
```
```javascript
// AuthGuard-service:
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,      // forced method canActivate
              state: RouterStateSnapshot): Observable <boolean> | <UrlTree> | Promise <boolean> | boolean {     // can run async/sync
        return this.authService.isAuthenticated().pipe(          // isAuthenticated is an Observable
          take(1),
          map(user => {
               const isAuth = !!user;
               if (isAuth) {
                    return true;
               }
               return this.router.createUrlTree(['/auth']);
          }))
        }      
        }
};
```
```javascript
// authService:
export class AuthService {
  loggedStatus = false;
  
  isAuthenticated() {
     const promise = new Promise ((resolve, reject) => {
          setTimeout(() => {resolve(this.loggedStatus)}, 5000);
     }
  }
  
  login() {this.loggedStatus = true};
}

  logout() {this.loggedStatus = false};
}
```
