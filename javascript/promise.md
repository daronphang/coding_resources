## Promise Object:
Object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
Contains both the producing code and calls to the consuming code.
```javascript
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery draw is happening');
    setTimeout(function() {
        if (Math.random() >= 0.5) {
            resolve('you win');
        } else {
            reject(new Error('you lost'));
        }
        }, 2000);
    });

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
```
```javascript
// Promisifying setTimeout, real world example
// Similar to fetch method as it returns a promise 
const wait = function(seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);    // don't need to pass any value to resolve function
    });
};

wait(2).then(() => {
    console.log('2s waited');
    return wait(1);
}).then(() => console.log('1s waited'));
```
```javascript
// to resolve or reject promises immediately
Promise.resolve('abc').then(x => console.log(x));
Promise.reject('error').catch(x => console.error(x));
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
