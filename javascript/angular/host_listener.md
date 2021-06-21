## Host Listener:
In a component, the host element is the outer most shell element that contains the template, and its tag name is your chosen selector string in the component’s configuration. 

```javascript
import { Directive, HostListener } from '@angular/core';

@Directive({selector: '[onlyMyBacon]'})   // any html element containing onlyMyBacon will be directive's host element
export class OnlyMyBacon {

  @HostListener('mouseenter') onMouseEnter() {
    alert("Don't touch my bacon!");
  }
}

```
