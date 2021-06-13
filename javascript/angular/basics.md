##Basics:
Framework for building client applications in HTML, CSS, and Javascript/Typescript.

## View Encapsulation:
```javascript
@component({
  encapsulation: ViewEncapsulation.None     // CSS styles in main.component is applied
  })
```

However, best way to use is ngContent hook to render contenet from another component.
```
example.component.html:
<ng-content></ng-content>

app.component.html:
<app-example> Hi there </app-example>   // will display Hi there, and not get lost by default
```
## Lifecycle Hooks:
```
constructor
ngOnInit
ngOnChanges
ngDoCheck
ngAfterContentInit
ngAfterContentChecked
```


## Cli:
```
# cli commands:
npm install -g @angular/cli
ng new hello-world
cd hello-world
ng serve

ng generate component components/header
ng generate component components/buttons

ng generate service hero

ng generate directive example
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
