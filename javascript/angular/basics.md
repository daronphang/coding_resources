## Basics:
Framework for building client applications in HTML, CSS, and Javascript/Typescript.

## Cli:
```
# cli commands:
npm install -g @angular/cli
ng new hello-world
cd hello-world
ng serve
ng build --prod

ng generate component components/header --module app
ng generate component components/buttons

ng generate service hero

ng generate directive example
```

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
Allow you to run a piece of code at different stages of the component's life.
```
constructor
ngOnChanges
ngOnInit
ngDoCheck
ngAfterContentInit
ngAfterContentChecked
ngAfterViewInit
ngAfterViewChecked
```
## Constructor vs NgOnInit:
- During initialization phase, Angular bootstrap process consists of components tree construction and running change detection.
- Constructor is called in former, while lifecycle hooks are called in latter.
- Constructor comes with every class (ES6 feature) which creates an instance of component class (not the component itself).
- Dependencies are injected into the constructor.
- Initialization code is placed in OnInit as it doesn't get executed in constructor.



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
