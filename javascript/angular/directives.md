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
