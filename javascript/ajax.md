## AJAX:
Asynchronous Javascript and XML. Used to pass client-side request to server-side. Can either use XMLHTTPRequest or fetch() method.

```javascript
// XMLHTTPRequest method
const request = new XMLHttpRequest();

// onreadystatechange defines a function to be called when its property changes
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = request.responseText;
    }
};
request.open("GET", 'http://example.com/singapore');      // does not open connection but configures the request only
request.send();

// fetch method
const getCountry = function(country) {
    fetch('https://example.com/task')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
};
```
```javascript
// response data is normally used to configure HTML format
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

request.addEventListener('load', function() {       // or data.addEventListener
    const [data] = JSON.parse(this.responseText);
    const html = 
    `<article class="country">
    <img class="country_img" src="${data.country}"/>
    ...
    </div>
    </article>`

    countriesContainer.insertAdjacentHTML('beforenend', html);
    countriesContainer.style.opacity =1;
});
```

## Fetch vs XMLHTTPRequest:
- Fetch uses  Promises and avoids callback hell.
- HTTP errors such as 404 or 500 does not cause Fetch Promise to reject and hence, .catch() is never run. Rejection only occurs if a request cannot be completed.
- Fetch won't send cookies unless credentials init option is set.


