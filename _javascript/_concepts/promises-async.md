## Promises

Object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
Contains both the producing code and calls to the consuming code.

```javascript
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log("Lottery draw is happening");
    setTimeout(function () {
        if (Math.random() >= 0.5) {
            resolve("you win");
        } else {
            reject(new Error("you lost"));
        }
    }, 2000);
});

lotteryPromise.then((res) => console.log(res)).catch((err) => console.error(err));
```

```javascript
// Promisifying setTimeout, real world example
// Similar to fetch method as it returns a promise
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000); // don't need to pass any value to resolve function
    });
};

wait(2)
    .then(() => {
        console.log("2s waited");
        return wait(1);
    })
    .then(() => console.log("1s waited"));
```

```javascript
// to resolve or reject promises immediately
Promise.resolve("abc").then((x) => console.log(x));
Promise.reject("error").catch((x) => console.error(x));
```

### Promise States

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

### Promise Combinators

```
Promise.all()           Constructor which takes an array of promises and runs them in parallel.
                        However, short circuits when one promise rejects.
                        Returns a single Promise that resolves to an array of results of input promises.
Promise.race()          First promise that settles wins. Doesn't matter if it is fulfilled or rejected.
Promise.allSettled()    Returns all promises, doesn't matter if they are fulfilled or rejected.
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

### Load Image and Hide After Delay

```javascript
const imgContainer = document.querySelector(".images");

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement("img");
        img.src = imgPath;

        img.addEventListener("load", function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener("error", function () {
            reject(new Error("Image not found"));
        });
    });
};

createImage("/img/img-1.jpg")
    .then((img) => {
        currentImg = img;
        console.log("image 1 loaded");
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = "none";
        return createImage("/img/img-2.jpg");
    })
    .then((img) => {
        currentImg = img;
        console.log("image 2 loaded");
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = "none";
    });
```

## Async/Await

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

Await keyword is used when calling a function that returns a promise (resolve or reject). Await blocks code execution (ensures the next line is executed when the promise resolves) and eliminates the use of callbacks in .then() and .catch() functions. There can be multiple await statements within a single async function. Try and catch are used to get rejection value of an async function.

```js
const getFirstUserData = async () => {
    const response = await fetch("/users.json"); // get users list
    const users = await response.json(); // parse JSON
    const user = users[0]; // pick first user
    const userResponse = await fetch(`/users/${user.name}`); // get user data
    const userData = await userResponse.json(); // parse JSON
    return userData;
};

getFirstUserData();
```

### Async/Await vs Promises

-   Both async/await and promises are used to handle asynchronous result of an operation so others can continue to execute.
-   Async/await is syntatic sugar for promises.
-   Entire wrapper function for async/await is asynchronous, whereas for promises, only the promise chain itself is.
-   Await is used for calling an async function and waits for it to resolve or reject (blocks execution code).
-   If function2 depends on output of function1, use await.
-   Mutliple promises are handled with Promise.all().

### Examples of Await/Async and Promises

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

// result to be executed
const imgs = imgArr.map(img => createImage(img));   // array of promises
imgs.forEach(img => img.then(res => {
    res.classList.add("parallel");
    console.log(res);   // <img src="eg.jpg" class="parallel">
}));

// using await and async
const loadAll = async function(imgArray) {
    try {
        const imgs = imgArray.map(async img => await createImage(img));
        console.log(imgs);                                                // array of fulfilled promises
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
