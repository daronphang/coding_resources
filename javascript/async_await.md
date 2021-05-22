## Async/Await:
Await is synthetic sugar for promises. Makes asynchronous code look like synchronous code and hence, easier to understand. Await keyword is used in an async function
to ensure all promises returned in the async function are synchronized. Await blocks code execution (ensures the next line is executed when the promise resolves) and eliminates the use of callbacks in .then() and .catch() functions. There can be multiple await statements within a single async function. Try and catch are used to get rejection value of an async function.
```javascript
const whereAmI = async function(country) {
    try {
        const response = await fetch(`https://example.com/${country}`);
        if (!response.ok) throw new Error('error fetching');
        const data = await response.json();
        console.log(data);
        // same as:
        // const res = fetch().then(res => {
        // data = res.json();
        // console.log(data))
    } catch(err) {
        console.error(err);
        throw err; // reject promise returned from async function
    } finally {
    console.log('finished execution')
    };
};
```
## Running Promises in Parallel:
Use constructor Promise.all() which takes an array of promises. However, short circuits when one promise rejects.
```javascript
const data = await Promise.all([
    getJSON(`https://example.com/${country1}`),
    getJSON(`https://example.com/${country2}`),
    getJSON(`https://example.com/${country3}`),
]);
```
