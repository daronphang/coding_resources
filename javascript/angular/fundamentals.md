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

ng generate directive example
```

## Angular Structure:
```
assets          Store images, files, icons, etc.
environments    Store configuration settings for different environments
karma           Test runner
```

## Property and Event Binding:
Can bind HTML elements, directives or components.

### Property Binding:
``` 
{{ data }}                                String Interpolation
[property]="component property"           Property Binding such as 'disabled' 
(event)="expression"                      Event Binding (HTML to TypeScript, react to user events)
[(ngModel)]="data"                        Two-way Binding

(input)="onUpdateServerName($event)"
// $event is a reserved variable name used in HTML when performing event binding, outputs the data emitted from the event
``` 
### Directives:
Instructions in the DOM. Components are directives with templates. Also have directives without templates.
```
*ngIf="boolean condition"                       Structural directive that helps to add or remove elements from DOM (it is not hidden)
*ngFor="let x of array"
[ngStyle]="{ backgroundColor: condition }"      Helps to dynamically update styles
[ngClass]="{ CSSclass: condition }"             Adds CSS class if condition is true

```

```javascript
<p>*ngIf="serverCreated; else noServer">Server was created</p>
<ng-template #noServer>     // # is used to create a marker
  <p>No server was created</p>
</ng-template>
```
## Attribute Directives:
Can change appearance or behavior of DOM elements and Angular components.
```javascript
import { Directive, Renderer2, ElementRef, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@directive({
  selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2)
  }
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  
  ngOnInit() {
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;  // shortcut for renderer
    
   
  @HostListener('mouseenter') mouseover(eventData: Event) {
     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'green', false, false);
     // same as this.elementRef.nativeElement.style.backgroundColor = 'green'; not good way of acccessing element directly
     
     // this.backgroundColor = this.highlightColor; used with host binding
   }
  }
}

// html file:
<p appBasicHighlight>Highlight me!</p>
```

### Binding Custom Properties:
To allow parent components (external) to bind a value to a property from another component, need add @Input. Exposes property to the world.
```javascript
import { Component, OnInit, Input } from 'angular/core';

export class ExampleComponent implements OnInit {
  @Input('target.name.alias') element: {type: string, name: string};
}

<app-example ['target.name.alias']="parent.component.property"></app-example>
``` 
### Binding Custom Events:
```javascript
// app.example.component:
import { EventEmitter, Output } from 'angular/core';

export class ExampleComponent implements OnInit {
  newServerName = '';
  newServerContent = '';
  
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();   // custom event
  
  onAddServer() {
  this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
} 

// app.component.html
<app-example> (serverCreated)="onServerAdded($event)"</app-example>   // onServerAdded is a function in app.component
```
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



## Services:
Shouldn't instantiate services on your own but instead use Dependency Injector i.e. inject an instance of class service into component in constructor method.
```javascript
constructor(private loggingService: LoggingService) {   // private or public. Need perform this for both service and component.ts
}
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
