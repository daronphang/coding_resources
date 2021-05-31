## Background:
Framework for building client applications in HTML, CSS, and Javascript/Typescript.
```
# cli commands:
npm install -g @angular/cli
ng new hello-world
cd hello-world
ng serve

ng generate component components/header
ng generate component components/buttons
```

## Angular Structure:
```
assets          Store images, files, icons, etc.
environments    Store configuration settings for different environments
karma           Test runner
```

### Hot Module Replacement:
HMR exchanges, adds or removes modules while an application is running without a full reload. 

### Webpack:
Module bundler, to bundle Javascript files for usage in browser. Automatically adds script files to index.html.


## Constructor vs NgOnInit:
Constructor is a default method that will always be executed when the class is instantiated. Used mainly for Dependency Injection. Common practice is to put as little logic as possible.

NgonInit is just a method on a class. When Angular calls, it has finished creating component DOM, injected all required dependencies and processed input bindings i.e. have all required information available and hence, make it a good place to perform initialization logic. 

During compiliation Angular compiler checks whether a component has this method implemented

is a lifecycle hook that is called by Angular after the constructor is called or when an event has happened. Mostly used for initialization/declaration of methods 
