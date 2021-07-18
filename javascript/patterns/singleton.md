## Singleton:
A design pattern that states only one instance of a class would persist in memory during application's life cycle. Any repeated calls to the constructor would always fetch the same instance. Useful in situations where system-wide actions need to be coordinated from a single central place such as database connection pool.

```javascript
var Singleton = (function () {
    var instance;

    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function run() {

    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();

    console.log("Same instance? " + (instance1 === instance2));
}
```
