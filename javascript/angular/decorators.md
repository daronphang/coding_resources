## Basics:
HostBinding and HostListener decorators can be useful in custom directives. 

## Host Listener:
Decorator method used for listening to DOM events on the host element of both component and attribute directives. Sets the listeners once the directive is initialized and removes them automatically once the directive gets destroyed. Also listens to events from children or nested elements.
In a component, the host element is the outer most shell element that contains the template, and its tag name is your chosen selector string in the component’s configuration. 
```javascript
// without host listener:
ngOnInit() {
    this.elRef.nativeElement.addEventListener('mouseenter', this.onMouseEnter);
  }

  ngOnDestroy() {
    this.elRef.nativeElement.removeEventListener('mouseenter', this.onMouseEnter);
  }

  onMouseEnter() {
     alert("Don't touch my bacon!")
  }
}
```

```javascript
import { Directive, HostListener } from '@angular/core';

@Directive({selector: '[onlyMyBacon]'})   // any html element containing onlyMyBacon will be directive's host element
export class OnlyMyBacon {

  @HostListener('mouseenter') onMouseEnter() {
    alert("Don't touch my bacon!");
  }
  
  @HostListener('mouseenter', ['$event'])   // $event accesses event payload object
    onMouseEnter(event: any) {        
      console.log(event.target.id);
    }
  
  @HostListener('window:click', ['$event.target'])
    onClick(targetElement: string) {
    console.log(`You clicked on`, targetElement);
}

}

```

## Host Binding: 
Directives can also bind input properties in the host element. Similar to property binding. Helps to bind a class property to a property of the host element.

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

## ViewChild:
Property decorator that configures a view query i.e. to access a directive, child component or DOM element from parent parent component. Change detector looks for first element or directive matching the selector in view DOM. If the view DOM changes and new child matches the selector, the property is updated. Can only view elements inside template of component itself and not cross boundaries i.e. local.

Variable is injected after view initialization is completed. To use references injected by ViewChild, need to initialize inside AfterViewInit() and not in ngOnInit(). 

```javascript
  @ViewChild('primaryColorSample') sample: ColorSampleComponent;    // to access component
  @ViewChild('primaryColorSample', {read: ElementRef}) sample: ElementRef;  // to access template ref
```
