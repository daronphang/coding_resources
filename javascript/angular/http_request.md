## HTTP Request:
Created as a service.
```javascript
// app.module.ts:

import { HttpClientModule } from '@angular/http';
@NgModule({
  imports: [HttpClientModule]
})

//HttpService.service.ts:

constructor(private http: HttpClient) {}

submitPost(submitData: (username: string, password: string)) {   // angular auto converts form data to json
  return httpRequest = this.http.post('https://API/endpoint', submitData) // subscribe in components  
  // for firebase, 'https://firebase/posts.json"
 }

getResponse() {
  return this.http.get('https://api/here')
  .pipe(map(responesData => {
    const postArray = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {   // to not ouput proto objects
        postArray.push({ ...resposeData[key], id: key })
      }
      return postArray
    }
  }))
}

//app-component.ts:

isFetching = false;

ngOnInit() {
  onSubmit() {
      this.isFetching = true;
      this.httpService.getResponse().subscribe(posts => console.log(posts)    {username: 'test', password: 'test', id: '12345'}
      this.isFetching = false;
  }
}
```
