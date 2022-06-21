## Http Options

```ts
const httpOptions = {
    headers: new HttpHeaders(),
    params: new HttpParams(),
    observe: "body | events | response", // defualt is body for GET
    responseType: "arraybuffer | blob | json | text", // defaults to JSON
    withCredentials: boolean,
};
```

### Adding Headers

https://angular.io/api/common/http/HttpHeaders

```ts
const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");

const headers = new HttpHeaders({
    Accept: "application/octet-stream",
});
```

## HTTP Requests

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

### Multiple AJAX Calls

-   forkJoin() for Observable which has similar functionality as Promise.all().
-   For converting to a Promise, use lastValueFrom() as toPromise() is deprecated and finally using Promise.all().
-   If interested in getting first emitted value from a stream that is constantly emitting, use firstValueFrom().

```js
// forkJoin
let data = ["hello", "world"];

const someFn = function () {
    const obsArr = data.map((item) => {
        const res = this.httpClient.get(`http://hello.com${item}`, options);
        return res.pipe(
            catchError((err) => "some error"),
            tap((data) => {
                // perform some data manipulation
            })
        );
    });

    return forkJoin(obsArr);
};

someFn().subscribe(
    (data) => console.log(data),
    (err) => console.log(err)
);

// using lastValueFrom()
async function execute() {
    const source$ = interval(2000).pipe(take(10));
    const finalNumber = await lastValueFrom(source$);
}
```

### Adding Delay before HTTP Requests

-   Using setTimeout() in an async function and converting Observables into a Promise.
-   Using from() and concatMap() to wait for first Observable to finish before subscribing to next Observable.

```js
fetchData(ticker: string) {
  const headers = {
    'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
    'x-rapidapi-key': '9484f772fbmsh9f388e9e7326eddp1f626ejsnc3ef33d3f125',
  };

  const response$ = this.http.get(
    `https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`,
    {
      headers: new HttpHeaders(headers),
    }
  );
  return response$.pipe(
    catchError((err) => `Error retrieving data from rapidapi for ticker ${ticker}. ${err}`)
  );
}

async delayRequest(chunk: string[], i: number) {
  await new Promise((resolve) => setTimeout(resolve, i * 2000));
  const chunkObs$ = chunk.map((item) => this.fetchData(item));
  return forkJoin(chunkObs$).toPromise();
}

getTickersData(tickerList: string[]) {
  // Maximum of 5 variables in array
  const chunkArr: string[][] = [];
  for (let i = 0; i < tickerList.length; i += 5) {
    const chunk = tickerList.slice(i, i + 5);
    chunkArr.push(chunk);
  }

  const tickersObs$ = chunkArr.map((chunk, i) => {
    return this.delayRequest(chunk, i);
  });

  return forkJoin(tickersObs$);
}
```

```js
getTickersData(tickerList: string[]) {
  // Maximum of 5 variables in array
  const chunkArr: string[][] = [];
  for (let i = 0; i < tickerList.length; i += 5) {
    const chunk = tickerList.slice(i, i + 5);
    chunkArr.push(chunk);
  }

  return from(chunkArr).pipe(
    concatMap((chunk) => {
      const chunkObs$ = chunk.map((ticker) => {
        return this.fetchData(ticker);
      });
      return forkJoin(chunkObs$);
    })
  );
}

const finalData: any[] = [];
const finalDataSub = new BehavorialSubject<any[]>([]);

getTickersData.pipe(take(10)).subscribe(
  data => {
    this.finalData.push(data);
  },
  err => console.log(err),
  finally => finalDataSub.next(finalData)
)
```

### Fetching CSV Data

```js
  retrieveInlineData(requestId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/octet-stream',
      }),
      responseType: 'text' as 'text',
    };
    const inlineDataRes = this.http.get(`https://tslma03/static/${requestId}.csv`, httpOptions);
    return inlineDataRes.pipe(
      catchError((err) => this.maService.handleError(err)),
      map((res) => {
        const splitIntoRows = res.split(/\r\n|\n|\r/);
        const headers = stringDelimiterHandler(splitIntoRows[0], ',');
        const spcDataArr: SpcData[] = [];
        splitIntoRows.forEach((row, i) => {
          if (i === 0) return;
          let spcData: any = {};
          const splitRowData = stringDelimiterHandler(row, ',');
          headers.forEach((header, i) => (spcData[header] = splitRowData[i]));
          spcDataArr.push(spcData);
        });
        spcDataArr.pop(); // removing empty object in last row
        return spcDataArr;
      })
    );
  }
```
