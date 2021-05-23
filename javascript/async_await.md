## Async/Await:
Async keyword before a function makes it return a promise.
```javascript
async function myFunction() {
  return "Hello";
}

// same as:
const function myFunction() {
  return Promise.resolve("Hello");
}
```

Await keyword before a function makes it wait for a promise until it returns a result (resolve or reject). Await blocks code execution (ensures the next line is executed when the promise resolves) and eliminates the use of callbacks in .then() and .catch() functions. There can be multiple await statements within a single async function. Try and catch are used to get rejection value of an async function.
```javascript
const whereAmI = async function(country) {
    try {
        const response = await fetch(`https://example.com/${country}`);   // fetch() is a promise, hence need use await
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
## Other Promise Combinators:
```
Promise.all()           Constructor which takes an array of promises and runs them in parallel. However, short circuits when one promise rejects.
Promise.race()          First promise that settles wins. Doesn't matter if it is fulfilled or rejected.
Promise.allSettled()    Returns all promises, doesn't matter if they are fulfilled or rejected. Same as Promise.all but doesn't short circuit.
Promise.any()           Returns the first fulfilled promise and ignores rejected promises.
```
```javascript
const whereAmI = async function(country1, country2, country3) {
    try {
        const data = await Promise.all([
            getJSON(`https://example.com/${country1}`),
            getJSON(`https://example.com/${country2}`),
            getJSON(`https://example.com/${country3}`),
        ]);
    };
 });
```
## Examples of Await/Async and Promises:
```javascript
const imgArr= ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath) {                  // returns a promise
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
      
      img.addEventListener('load', function () {
        imagesContainer.append(img);
        resolve(img);
      });
  
      img.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
  };

const loadAll = async function(imgArray) {
    try {
        const imgs = imgArray.map(async img => await createImage(img));  
        console.log(imgs);      // array of fulfilled promises
        const imgsEl = await Promise.all(imgs);

        imgsEl.forEach(img => img.classList.add("parallel"));
    } catch (err) {
        console.log(err);
        throw err;
    }};
    
loadAll(imgArr);

// html:
<div class="images">
    <img src="img/img-1.jpg" class="parallel">
    <img src="img/img-2.jpg" class="parallel">
    <img src="img/img-3.jpg" class="parallel">
</div>
```
