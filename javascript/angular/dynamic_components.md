## Alert Box:
```javascript
// child.component:
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  styleUrls: ['./alert.component.css'],
  templateUrl: './alert.component.html'
})

export class AlertComponent {
  @Input() message?: string;

  @Output() closeEvent = new EventEmitter<void>();
  
  closeAlert() {
    this.closeEvent.emit();
  }
}

// parent.component:
error?: string; 
onHandleError(event) {
  this.error = null;
}
```
```html
// child.html
<div class="backdrop" (click)="closeAlert()"></div>
<div class="alert-box">
        <p>{{ message }}</p>
        <button class="btn btn-primary" (click)="closeAlert()">Close</button>
</div>

// parent.html:
<app-alert [message]="error" *ngIf="error" (closeEvent)="onHandleError($event)"></app-alert>
```
```css
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.75);
    z-index: 50;
}

.alert-box {
    position: fixed;
    top: 30vh;
    left: 20vw;
    width: 60vw;
    padding: 16px;
    z-index: 100;
    background: white;
    box-shadow: 0 2px 8px rbga(0,0,0,0.26);
}

.alert-box-actions {
    text-align: right;
}
```
## Creating Components Programmatically:
Components are eventually DOM elements. Will need a placeholder to add element into DOM.
```javascript
// placeholder.directive.ts
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceHolder]'
})

export class PlaceHolderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
```
```html
<ng-template appPlaceHolder></ng-template>   // to get access to this place in DOM using directives
```
```javascript
// app.component.ts:
import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, NgModule } from '@angular/core';

@Component({
  selector: 'app-alert',
  styleUrls: ['./alert.component.css'],
  templateUrl: './alert.component.html'
})

export class AlertComponent {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;  // finds the first occurence of this directive in DOM

  private closeSub?: Subscription;

  private showErrorAlert(message: string) {   // method called when an error occurs
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);  resolveComponentFactory is an object that knows how to create a component
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();     // removes the previous view; else it will append more components to the container
    const componentRef = hostviewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
  
// app.module.ts
@ngModule({
  entryComponents: [AlertComponent]
})
```
