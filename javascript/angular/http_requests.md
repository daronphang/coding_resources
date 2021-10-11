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

## Multiple AJAX Calls:
- forkJoin() for Observable which has similar functionality as Promise.all().
- For converting to a Promise, use lastValueFrom() as toPromise() is deprecated and finally using Promise.all().
- If interested in getting first emitted value from a stream that is constantly emitting, use firstValueFrom().

```js
// forkJoin
let data = ['hello', 'world'];

const someFn = function () {
  const obsArr = data.map(item => {
    const res = this.httpClient.get(`http://hello.com${item}`, options);
    return res.pipe(
      catchError(err => 'some error'),
      tap(data => {
        // perform some data manipulation
      })
    )
  });

  return forkJoin(obsArr);
}

someFn().subscribe(data => console.log(data), err => console.log(err));


// using lastValueFrom()
async function execute() {
  const source$ = interval(2000).pipe(take(10));
  const finalNumber = await lastValueFrom(source$);
}
```
