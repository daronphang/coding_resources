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
```javascript
// helper.directive.ts
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appHelper]'
})

export class HelperDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
```
```html
<ng-template appHelper></ng-template>   // to get access to this place in DOM
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

  private closeSub?: Subscription;

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(Alertcomponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); 
    const componentRef = hostviewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
  
  @ViewChild(HelperDirective, {static: false}) alertHost: HelperDirective;
```
