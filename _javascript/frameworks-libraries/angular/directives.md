## Directives

Directives are classes that add additional behavior or styling to elements. Three types are Components, Structural and Attribute. They are markers on DOM element that tell Angular to attach a specified behavior to that element.

## Components

Directives with template.

## Inbuilt Attribute Directives

Help to change appearance of DOM element/component conditionally. Basically a class with @Directive decorator. Can assign an object literal inline or by binding to a property.

```
[ngStyle]       Add/remove CSS styles
[ngClass]       Add/remove CSS classes. Can either pass an expression as a string/array/object
[(ngModel)]     Adds two-way binding to HTML form element
```

```
[ngStyle]="{'color': Red,'font-weight': 'Bold','font-size':'35px','borderBottom': borderStyle}"
[ngStyle]="{'font-size.px':24}"
[ngStyle]="{'background-color':person.country === 'UK' ? 'green' : 'red' }
[ngStyle]="appStyleGreen"

[ngStyle]="{'color': changeColor(condition)}"

[ngClass]="['btn', 'btn-primary']"
[ngClass]="{ btn:true, 'btn-primary':true }"
```

```html
<div [ngClass]="isSpecial ? 'specialClass' : ''">This div is special</div>
<input [(ngModel)]="currentItem.name" id="example-ngModel" />
```

```js
changeColor(condition: string) {
  if (condition == 'hello') {
    return 'red';
  } return 'blue';
}
```

### NgModel

Directive binds the value of HTML controls (input, select, text area) to application data i.e. bind input field value to variable. Can include (ngModelChange). Difference between (ngModelChange) and (change):

- (change) is DOM event which fires when user has blurred input.
- (ngModelChange) listens to input event and fire before the value bound to NgModel has changed.

```javascript
@Component({
  selector: "my-app",
  template: `
    <div>
      <input [value]="foo" (change)="changeFn($event)" />
      <p></p>
      <input [ngModel]="bar" (ngModelChange)="modelChangeFn($event)" />
      <p></p>
    </div>
  `,
})
export class AppComponent {
  foo = "Hello";
  bar = "World";
  changeFn(e) {
    this.foo = e.target.value;
  }
  modelChangeFn(value) {
    this.bar = value;
  }
}
```

## Inbuilt Structural Directives

Responsible for HTML layout. Used for manipulating, modifying and removing elements inside a component template. \* character translate the attribute into a <ng-template> element.

```
*ngIf="property"                    Conditionally add/remove elements from DOM (it is not hidden)
*ngFor="let x of array"             Makes each item available to HTML for each iteration
[ngSwitch] & *ngSwitchCase/Default  Used when displaying an element tree containing many children
```

```html
<app-item-detail *ngFor="let item of items" [item]="item"></app-item-detail>
<div *ngFor="let item of items; let i=index">{{i + 1}} - {{item.name}}</div>

<ul *ngFor="let person of people" [ngSwitch]="person.country">
 <li *ngSwitchCase="'UK'"
     class="text-success">{{ person.name }} ({{ person.country }})
 </li>
 <li *ngSwitchCase="'USA'"
     class="text-primary">{{ person.name }} ({{ person.country }})
 </li>
 <li *ngSwitchDefault      // displayed when no match is found
     class="text-warning">{{ person.name }} ({{ person.country }})
 </li>
</ul>
```

```html
<!--ng-template doesn't render anything by default-->
<p *ngIf="serverCreated">Server was created</p>

<ng-template #noServer>
  <!--# is used to create a marker-->
  <p>No server was created</p>
</ng-template>

<!-- *ngIf is just syntactic sugar i.e. nicer syntax for something existing -->
<!-- both are the same -->
<p *ngIf="isVisible">This is visible</p>
<ng-template [ngIf]="isVisible"><p>This is visible</p></ng-template>
```

### ngFor Objects

```js
// defined in component
ObjectKeys = Object.keys;
``` 
```html
<div *ngFor="let key of ObjectKeys(submittedRequestsService.requestDetails$ | async)">
</div>
```


## Building Attribute Directives

Can use either ElementRef, Renderer2 or HostBinding to access and modify DOM elements. Best practice is to use Renderer2 and HostListener. The initial @Input must match with selector name. Make sure the directive is imported and exported in shared module.

```html
<!--component.html-->
<!--defaultColor is static so don't use square brackets-->
<p [appHighlight]="color" defaultColor="violet">Highlight me!</p>
```

```js
// app.component:
export class AppComponent {
  color = "yellow";
}
```

```js
// highlight.directive.ts
import { Directive, Renderer2, ElementRef, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@directive({
  selector: '[appHighlight]'   // specify directive's CSS attribute selector
})

export class HighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  // passing values into attribute directive
  @Input() appHighlight = '';
  @Input() defaultColor: string = '';    // binding to second property

  @HostBinding('style.backgroundColor') backgroundColor: string;  // shortcut for renderer

  // handling user events
  @HostListener('mouseenter') onMouseEnter(eventData: Event) {
    this.highlight(this.appHighlight || this.defaultColor || 'yellow');
   }

 private highlight(color: string) {
   this.renderer.setStyle(this.elRef.nativeElement, 'background-color', color, false, false);
   // same as this.elementRef.nativeElement.style.backgroundColor = color;  Not good way of acccessing element directly
 }

  ngOnInit() {this.backgroundColor = this.defaultColor}
}

```

## Building Custom Structural Directives

1. Use Directive decorator to define Custom Directive.
2. Provide a selector which represents this Directive.
3. Constructor receives TemplateRef and ViewContainerRef.

TemplateRef refers to the content enclosed within the container. ViewContainerRef refers to the container to which directive is applied. They are injected to get access to them.

```js
// unless.directive.ts:
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})

export class UnlessDirective {
  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) {}

  @Input() set appUnless(value: boolean) {    // bind value to property appUnless using setter method
  if (!condition) {
    this.container.createEmbeddedView(this.template);
  } else {
    this.container.clear();
  }
  }
}
```

```html
<!--parent.component.html-->
<div *appUnless="isVisible">
  <!--<div> referred by ViewContainerRef-->
  <h1>This is the template area</h1>
  <!--Content inside container (<h1>) referred by TemplateRef-->
</div>
```

## Local References

Can only be used in HTML and not in TypeScript. Can add into any HTML tag.

```html
<input #serverNameInput />
```

To use local reference in TypeScript, use ViewChild decorator.

```javascript
export class ExampleComponent implements OnInit {
  @ViewChild("serverNameInput", { static: true }) serverNameInput: ElementRef; // property

  // to access value:
  onAddServer() {
    serverName: this.serverNameInput.nativeElement.value;
  }
}
```
