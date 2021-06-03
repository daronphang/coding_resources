Framework for building client applications in HTML, CSS, and Javascript/Typescript.

## Property Binding:
Can bind HTML elements, directives or components.
``` 
{{ data }}                                String Interpolation
[property]="some value"                   Property Binding such as 'disabled' 
(event)="expression"                      Event Binding (HTML to TypeScript, react to user events)
[(ngModel)]="data"                        Two-way Binding

(input)="onUpdateServerName($event)"
// $event is a reserved variable name used in HTML when performing event binding, outputs the data emitted from the event
``` 
## Directives:
Instructions in the DOM. Components are directives with templates. Also have directives without templates. * are structural directives.
```
*ngIf="boolean condition"                       Structural directive that helps to add or remove elements from DOM (it is not hidden)
*ngFor="let x of array"
[ngStyle]="{ backgroundColor: condition }"      Helps to dynamically update styles
[ngClass]="{ CSSclass: condition }"             Adds CSS class if condition is true
```
```javascript
// using ng-template:
<p>*ngIf="serverCreated; else noServer">Server was created</p>
<ng-template #noServer>     // # is used to create a marker
  <p>No server was created</p>
</ng-template>

// using ngSwitch:
<div [ngSwitch]="value">
  <p *ngSwitchCase="5"> Value is 5</p>
  <p *ngSwitchCase="10"> Value is 10</p>
</div>
```
## Building Attribute Directives:
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
  @HostBinding('style.backgroundColor') backgroundColor: string;  // shortcut for renderer
  
  ngOnInit() {
  
    
  this.backgroundColor = this.defaultColor;
  
  @HostListener('mouseenter') mouseover(eventData: Event) {
     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'green', false, false);
     // same as this.elementRef.nativeElement.style.backgroundColor = 'green'; not good way of acccessing element directly
     
     // this.backgroundColor = this.highlightColor; used with host binding
   }
  }
}

// html file:
<p appBasicHighlight [defaultColor]="yellow">Highlight me!</p>
```
## Building Structural Directives:
```javascript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})

export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
  if (!condition) {
    this.viewRef.createEmbeddedView(this.templateRef);
  } else {
    this.viewRef.clear();
  }
  }
  
  constructor(private templateRef: TemplateRef<any>, private viewRef: ViewContainerRef) {}
}

// html:
<div *appUnless="boolean condition" type code here </div>
```

## Binding Custom Properties:
To allow parent components (external) to bind a value to a property from another component, need add @Input. Exposes property to the world.
```javascript
import { Component, OnInit, Input } from 'angular/core';

export class ExampleComponent implements OnInit {
  @Input('target.name.alias') element: {type: string, name: string};
}

<app-example ['target.name.alias']="parent.component.property"></app-example>
``` 
## Binding Custom Events:
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
## Routing:
```javascript
<li rounterLinkActive="myActiveClass"              // add CSS class to element     
     [routerLinkActiveOptions]="{exact: true}">     // shows active tab, marked if full path is in router link
     <a [routerLink]="['/users', 10, 'anna']">      // prevents page from reloading by default, loads /users/10/anna
     [queryParams]="{allowEdit: '1', value: '10'}"  // /allowEdit?=1value?=10
     [fragment]="loading"                           // /#loading
     </a>
</li>

onLoadServers(id: number) {
  this.router.navigate(['/users', id, 'edit'], {queryParams: {allowEdit:1}, fragment: 'loading'});
```
```javascript
// Navigate programmatically
constructor(private router: Router, private route: ActivatedRoute) {}

onLoadServers() {
  // perform some complex calculation
  this.router.navigate(['/users'], {relativeTo: this.route});
}
```
```javascript
// Fetching route parameters i.e. home/users/1/john
// route.ts:
const appRoutes: Routes = [
  {path: 'users/:id/:name', component: UserComponent},
]

// component.ts:
import { Subscription } from './rxjs/Subscription';

constructor(private route: ActivatedRoute) {}

user: {id: number, name: string};
paramSubscription: Subscription;

ngOnInit() {
  this.user = {
    id: this.route.snapshot.param['id'],
    name: this,route.snapshot.param['name']
  };
  
  // also have queryParams.subscribe() and fragment.subscribe()
  this.paramSubscription = this.route.params.subscribe((params: Params) => {   // runs when user param changes
    this.user.id = params['id'];
    this.user.name = params['name'];
  })

ngOnDestroy() {
  this.paramSubscription.unsubscribe();   // good habit but not necessary
}
}
```

## Services:
Shouldn't instantiate services on your own but instead use Dependency Injector i.e. inject an instance of class service into component in constructor method.
```javascript
constructor(private loggingService: LoggingService) {   // private or public. Need perform this for both service and component.ts
}
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
