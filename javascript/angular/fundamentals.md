Framework for building client applications in HTML, CSS, and Javascript/Typescript.


## View Encapsulation:
```javascript
@component({
  encapsulation: ViewEncapsulation.None     // CSS styles in main.component is applied
  })
```
## Local References:
Can only be used in HTML and not in TypeScript. Can add into any HTML tag. 
```
<input #serverNameInput> // logging results <input>
```
To use local reference in TypeScript, use ViewChild decorator.
```javascript
export class ExampleComponent implements OnInit {
  @ViewChild('serverNameInput', {static: true}) serverNameInput: ElementRef;    // property
  
  // to access value:
  onAddServer() {
    serverName: this.serverNameInput.nativeElement.value;
  }
}
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

NgonInit is just a method on a class. When Angular calls, it has finished creating component DOM, injected all required dependencies and processed input bindings i.e. have all required information available and hence, make it a good place to perform initialization logic. 

During compiliation Angular compiler checks whether a component has this method implemented

is a lifecycle hook that is called by Angular after the constructor is called or when an event has happened. Mostly used for initialization/declaration of methods 
