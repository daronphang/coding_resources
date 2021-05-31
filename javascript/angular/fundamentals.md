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
