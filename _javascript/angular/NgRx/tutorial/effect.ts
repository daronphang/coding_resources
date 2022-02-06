//auth.effects.ts:
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth/actions';

@Injectable() // to inject items into effect from constructor

export class AuthEffects {
  @Effect()   // to turn class into an effect
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START)  // to filter type of effects you want
    switchMap((authData: AuthActions.LoginStart) => {   // inner Observable supplied is cancelled and new is subscribed
      return this.http.post(
        'http://example.com', {username: authData.payload.email, password: authData.payload.password}
    ).pipe(
      map(resData => {
        return new AuthActions.Login({username: resData.username, password: resData.password))
      }
      )),
      catchError(errRes => {
        let errorMsg = 'An unknown error occured';
        if(!errorRes.error) || !errorRes.error.error) 
        ...   // put error logic here
        
        return of(new AuthActions.LoginFail(errorMessage));   // don't throw error as cannot let Observable to fail
      });
  );
  
  @Effect({dispatch: false})  // inform NgRx this effect will not yield a dispatchable action
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']); 
    })
  )
  
  
  constructor(private actions$: Actions, private http: HttpClient, router: Router) {} // $ indicates observable
}
