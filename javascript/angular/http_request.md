## HTTP Request:
Created as a service. Components will subscribe the HTTPrequest.
```javascript
// app.module.ts:

import { HttpClientModule } from '@angular/http';
@NgModule({
  imports: [HttpClientModule]
})

//HttpService.service.ts:
import ( map, catchError ) from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

constructor(private http: HttpClient) {}

submitPost(submitData: (username: string, password: string)) {   // angular auto converts form data to json
  return httpRequest = this.http.post('https://API/endpoint', submitData) // subscribe in components  
  // for firebase, 'https://firebase/posts.json"
 }

getResponse() {
  let headers: new HttpHeaders();
  let searchParams: new HttpParams();
  
  headers = headers.append({'custom-header': 'hello'});
  searchParams = searchParams.append('print', 'pretty');

  return this.http.get('https://api/here',
    {
      headers: headers,
      params: searchParams,
      observe: 'events',    // to output type of response; can be body, response, events
      responseType: 'json',
    }
  )
  .pipe(map(responesData => {
    const postArray = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {   // to not ouput proto objects
        postArray.push({ ...resposeData[key], id: key })
      }
      return postArray
    }
  })
  catchError(errorRes => return throwError(errorRes));
  )
}

//app-component.ts:

isFetching = false;
error = null;
private errorSub: Subscription;

ngOnInit() {
  this.errorSub = this.httpService.error.subscribe(errorMessage => this.error = errorMessage);  // subscription-based strategy

  onSubmit() {
      this.isFetching = true;
      this.httpService.getResponse().subscribe(posts => console.log(posts), // {username: 'test', password: 'test', id: '12345'}
        error => this.error = error.message)    
      this.isFetching = false;
  }
}
```
## Interceptors:
To add headers/params to every request sent out.
```javascript
// app.module.ts:
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})

// auth-interceptor.service.ts
Import { HttpInterceptor } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {   // next is a function that allows request to continue its journey
    console.log('request is on its way');
    return next.handle(req);
  }
}


```
