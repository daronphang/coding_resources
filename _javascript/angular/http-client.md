## Http Options

```ts
const httpOptions = {
  headers: new HttpHeaders(),
  params: new HttpParams(),
  observe: 'body | events | response',    // defualt is body for GET
  responseType: 'arraybuffer | blob | json | text',   // defaults to JSON
  withCredentials: boolean
}
```

### Adding Headers

https://angular.io/api/common/http/HttpHeaders

```ts
const headers = new HttpHeaders().set('X-CustomHeader', 'custom header value')

const headers = new HttpHeaders({
  Accept: 'application/octet-stream',
})
```
