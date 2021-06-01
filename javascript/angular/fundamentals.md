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

ng generate service hero
```

## Angular Structure:
```
assets          Store images, files, icons, etc.
environments    Store configuration settings for different environments
karma           Test runner
```
## Databinding:
``` 
{{ data }}              String Interpolation
[disabled]="data"       Property Binding
(event)="expression"    Event Binding (HTML to TypeScript, react to user events)
[(ngModel]="data"       Two-way Binding

(input)="onUpdateServerName($event)"
// $event is a reserved variable name used in HTML when performing event binding, outputs the data emitted from the event
``` 
## Directives:
Instructions in the DOM. Components are directives with templates. Also have directives without templates.
```
*ngIf = "boolean condition"                     Structural directive that helps to add or remove elements from DOM (it is not hidden)
[ngStyle]="{ backgroundColor: getColor() }"     Helps to dynamically update styles
[ngClass-="{ CSSclass: condition}"              Adds CSS class if condition is true
*ngFor="let x of array"
```

```javascript
<p>*ngIf="serverCreated; else noServer">Server was created</p>
<ng-template #noServer>     // # is used to create a marker
  <p>No server was created</p>
</ng-template>
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
