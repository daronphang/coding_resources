## Reject:
Inbuilt function that returns a Promise object which has been rejected.
```js
const p = new Promise( ( resolve, reject ) => { 
  
   reject( 'promise failed!' );
  
});
p.catch(err => { 
  
    console.log( err );
  
});
```
