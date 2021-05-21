## AJAX:
Asynchronous Javascript and XML. Used to pass client-side request to server-side. Can either use XMLHTTPRequest or fetch() method.

```javascript
const getCountry = function(country) {
    fetch('https://example.com/task')
    .then(response => response.json())
    .then(data => console.log(data))
};
```

## Fetch vs XMLHTTPRequest:
- HTTP errors such as 404 or 500 does not cause Fetch Promise to reject and hence, .catch() is never run. Rejection only occurs if a request cannot be completed.
- Fetch won't send cookies unless credentials init option is set.


