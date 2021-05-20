## Promise Object:
Object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
Contains both the producing code and calls to the consuming code.
```javascript
let myPromise = new Promise(function(myResolve, myReject) {
// "Producing Code" (May take some time)

  myResolve(); // when successful
  myReject();  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function(value) { /* code if successful */ },
  function(error) { /* code if some error */ }
);

// When executing code obtains the result, it should call one of these callbacks:
// Success      myResolve(result value)
// Error        myReject(error object)
```
### Promise States:
```
pending:      Initial state, neither fulfilled nor rejected
fulfilled:    Operation completed successfully
rejected:     Operation failed
```

```javascript
const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
```
