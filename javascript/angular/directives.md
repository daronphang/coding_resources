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
## Inbuilt Structural Directives:
Responsible for manipulating, modifying and removing elements inside a component template.
```
*ngIf="boolean condition"                       Structural directive that helps to add or remove elements from DOM (it is not hidden)
*ngFor="let x of array"
[ngStyle]="{ backgroundColor: condition }"      Helps to dynamically update styles
[ngClass]="{ CSSclass: condition }"             Adds CSS class if condition is true
```
```javascript
// ng-template doesn't render anything by default 
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
```html
// *ngIf is just syntactic sugar i.e. nicer syntax for something existing
//both are the same
<p *ngIf="isVisible"> This is visible </p?

<ng-template [ngIf]="isVisible"><p>This is visible</p></ng-template>
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
## Building Custom Structural Directives:
1) Use Directive decorator to define Custom Directive.
2) Provide a selector which represents this Directive.
3) Constructor receives TemplateRef and ViewContainerRef.

TemplateRef refers to the content enclosed within the container.
ViewContainerRef refers to the container to which directive is applied.
```javascript
// unless.directive.ts:
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})

export class UnlessDirective {
  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) {}
  
  @Input() set appUnless(value: boolean) {
  if (!condition) {
    this.container.createEmbeddedView(this.template);
  } else {
    this.container.clear();
  }
  }
}
```
```html
// parent.component.html:
<div *appUnless="isVisible">              // <div> referred by ViewContainerRef
  <h1>This is the template area</h1>      // Content inside container (<h1>) referred by TemplateRef
</div>
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
