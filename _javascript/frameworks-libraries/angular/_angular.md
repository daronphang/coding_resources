## Angular

Framework for building client applications in HTML, CSS, and Javascript/Typescript.

### Cli

```console
$ npm install -g @angular/cli
$ ng new hello-world
$ cd hello-world
$ ng serve
$ ng build --prod

$ ng generate component components/header --module app
$ ng generate component components/buttons

$ ng generate service hero

$ ng generate directive example
```

### View Encapsulation

```javascript
@component({
  encapsulation: ViewEncapsulation.None     // CSS styles in main.component is applied
  })
```

However, best way to use is ngContent hook to render content from another component.

```html
<!--example.component.html-->
<ng-content></ng-content>

<!--app.component.html-->
<app-example> Hi there </app-example>
<!--will display Hi there, and not get lost by default-->
```

### Lifecycle Hooks

Allow you to run a piece of code at different stages of the component's life.

```
constructor                 Calling new on the class
ngOnChanges                 Invokes everytime there is a change in @input properties of component
ngOnInit                    Invoked when component has been initialized; only called once after first ngOnChanges
ngDoCheck                   custom change-detection for directive where ngOnChanges won't catch but very expensive
ngOnDestroy

// hooks for component's children
ngAfterContentInit          Called when contents between <ng-content> are initialized
ngAfterContentChecked       Default change detector for ng-content
ngAfterViewInit             Called after component's and its children's views have been initialized
ngAfterViewChecked          Called after change detector of child component has been run for checks
```

### Constructor vs NgOnInit

-   During initialization phase, Angular bootstrap process consists of components tree construction and running change detection.
-   Constructor is called in former, while lifecycle hooks are called in latter.
-   Constructor comes with every class (ES6 feature) which creates an instance of component class (not the component itself).
-   Constructor is a default method that will always be executed when the class is instantiated; common practice is to put as little logic as possible.
-   Dependencies are injected into the constructor.
-   Initialization code is placed in OnInit as it doesn't get executed in constructor.

### Angular Structure

```
assets          Store images, files, icons, etc.
environments    Store configuration settings for different environments
karma           Test runner
```

### Hot Module Replacement

HMR exchanges, adds or removes modules while an application is running without a full reload.

### Webpack

Module bundler, to bundle Javascript files for usage in browser. Automatically adds script files to index.html. Takes modules with dependencies and generates static assets representing those modules. Modules are reusuable chunks of code. Allows you to use require() for CSS files. If one file depends on another, Webpack treats this as a dependency.
