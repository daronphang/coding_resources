## Module

A module is a function or similar functions grouped together within a file and contain the code to execute a specific task when called into a larger application. Also characterized by a division of private and public details, and is also stateful i.e. maintains some information over time, along with functionality to access and update that information.

Modules are created to better organize and structure your codebase. Can break down large programs into smaller, more manageable, and more independent chunks of code which carry out a single or couple of related tasks.

### Namespaces (Stateless Grouping)

Groups a set of related functions but without data (stateless).

```js
// utils namespace, not module
var Utils = {
    cancelEvt(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    },
    wait(ms) {
        return new Promise(function c(res) {
            setTimeout(res, ms);
        });
    },
    isValidEmail(email) {
        return /[^@]+@[^@.]+\.[^@.]+/.test(email);
    },
};
```
