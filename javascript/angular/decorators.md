### Host Listener

Decorator method used for listening to DOM events on the host element of both component and attribute directives. Sets the listeners once the directive is initialized and removes them automatically once the directive gets destroyed. Also listens to events from children or nested elements.

In a component, the host element is the outer most shell element that contains the template, and its tag name is your chosen selector string in the component’s configuration.

```js
// without host listener
ngOnInit() {
    this.elRef.nativeElement.addEventListener('mouseenter', this.onMouseEnter);
  }
}

ngOnDestroy() {
  this.elRef.nativeElement.removeEventListener('mouseenter', this.onMouseEnter);
}

onMouseEnter() {
    alert("Don't touch my bacon!")
}
```

```js
import { Directive, HostListener } from "@angular/core";

@Directive({ selector: "[onlyMyBacon]" }) // any html element containing onlyMyBacon will be directive's host element
export class OnlyMyBacon {
  @HostListener("mouseenter") onMouseEnter() {
    alert("Don't touch my bacon!");
  }

  @HostListener("mouseenter", ["$event"]) // $event accesses event payload object
  onMouseEnter(event: any) {
    console.log(event.target.id);
  }

  @HostListener("window:click", ["$event.target"])
  onClick(targetElement: string) {
    console.log(`You clicked on`, targetElement);
  }
}
```

### Host Binding

Directives can also bind input properties in the host element. Similar to property binding. Helps to bind a class property to a property of the host element.

```html
<!-- _elementBorder is a property in host component -->
<div class="search-container" [focusDirective]="_elementBorder"></div>
```

```javascript
import { Directive, HostBinding, Input, OnChanges } from "@angular/core";

@Directive({
    selector: '[focusDirective]'
})

export class FocusDirective implements OnChanges {
    @Input() focusDirective: boolean = false;
    @HostBinding('style.border') border?: String;
    // can bind style.background, class.someClassName, etc.

    ngOnChanges() {
        this.focusDirective ? this.border = '2px solid #3383FF' : this.border = '1px solid #D3D3D3'
    }
}

```

### ViewChild

Property decorator that configures a view query i.e. to access a directive, child component or DOM element from parent component. Change detector looks for first element or directive matching the selector in view DOM. If the view DOM changes and new child matches the selector, the property is updated. In terms of visibility scope, @ViewChild cannot be used to inject anything inside the templates of its child and parent components i.e. decorator can only query templates that are local to the component and not cross boundaries.

```html
<color-sample [color]="primary" #primaryColorSample> </color-sample>
<h2 #title>Choose Brand Colors:</h2>
<mat-input-container>
  <mat-label>Primary Color</mat-label>
  <input
    matInput
    #primaryInput
    [(colorPicker)]="primary"
    [(ngModel)]="primary"
  />
</mat-input-container>
```

```javascript
// child component
export class ColorSampleComponent {
  // ...
}
```

### Injecting Reference to Child Component

Variable is injected after view initialization is completed. To use references injected by ViewChild, need to initialize inside AfterViewInit() and not in ngOnInit(). Can also inject reference to DOM element of child component which will return the child component instance and not HTML element.

```javascript
// parent component
export class ParentComponent implements AfterViewInit {
  @ViewChild(ColorSampleComponent) primarySampleComponent: ColorSampleComponent;
  @ViewChild("primaryColorSample") sample: ColorSampleComponent; // same as above

  ngAfterViewInit() {
    console.log(this.primarySampleComponent);
  }
}
```

### Injecting Reference to DOM Element

Direct interaction with plain HTML element of template.

```javascript
  @ViewChild('title') title: ElementRef;  // to access template ref
  @ViewChild('primaryColorSample', {read: ElementRef}) sample: ElementRef;  // to access HTML element of child component, pass in options arg
```

### ViewChildren

provides a list of element references rather than returning a single reference. If list is subscribed to an Observable, need to subscribe to changes to view latest results.

```javascript
 @ViewChildren(ChildComponent) children: QueryList<ChildComponent>;

 children.changes.subscribe((results) => console.log(results));
```
