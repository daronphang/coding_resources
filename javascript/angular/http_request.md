## HTTP Request:
```javascript
// app.module.ts:

import { HttpClientModule } from '@angular/http';
@NgModule({
  imports: [HttpClientModule]
})

//app.component.ts:

constructor(private http: HttpClient) {}

on Submit(submitData: (username: string, password: string)) {   // angular auto converts form data to json
  httpRequest = this.http.post('https://API/endpoint', submitData).subscribe(data => )  
  
  // for firebase, 'https://firebase/posts.json"
 }

onGetResponse() {
  this.http.get('https://api/here')
  .pipe(map(responesData => {
    const postArray = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        postArray.push({ ...resposeData[key], id: key })
      }
      return postArray
    }
  }))
  .subscribe(posts => console.log(posts)
}
  


```
