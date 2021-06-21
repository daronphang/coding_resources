## Summary:
```
{{ data }}                                String Interpolation
[html element]="property"                 Property Binding such as 'disabled' 
(event)="expression"                      Event Binding (HTML to TypeScript, react to user events)

(input)="onUpdateServerName($event)"
// $event is a reserved variable name used in HTML when performing event binding, outputs the data emitted from the event
``` 

## Input:
For sharing data from parent to child.
```javascript
// child.component.ts
export class ChildComponent {
  @Input('target.name.alias') item: string = ''
}

//parent.component.html
<app-child ['target.name.alias']="currentItem"></app-child>  // currentItem is property from parent
```
## Output:
For sharing data from child to parent.
```javascript
// child.component.ts
export class ChildComponent {
  @Output() : newItemEvent = new EventEmitter<string>();   // output is string type
  
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
}

// child.component.html
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem>    // newItem is alias for input 
<button (click)="addNewItem(newItem.value)">Add to parent's list</button>
```
```javascript
// parent.component.ts
export class AppComponent {
  items = ['item1', 'item2', 'item3', 'item4'];

  addItem(newItem: string) {
    this.items.push(newItem);
  }
}

// parent.html
<app-child (newItemEvent)="addItem($event)"></app-child>
```

## Services:
Get instantiated once during lifetime of app. A class containing methods that maintain data throughout app life i.e. data does not get refreshed and available all the time. 
Main objective is to organize and share business logic, models, data and functions between different components that may/may not be related. Shouldn't instantiate services on your own but instead use Dependency Injector i.e. inject an instance of class service into component in constructor method.

Useful for cross-component communication.
```javascript
// accounts.service.ts

statusUpdated = new EventEmitter<string>();

// account.component.ts to emit
someFunction() {
  this.accountService.statusUpdated.emit(status);
}

// anotherComponent.ts to listen 
someFunction() {
  this.accountService.statusUpdated.subscribe(place some function);
}

constructor(private loggingService: LoggingService) {   // private or public. Need perform this for both service and component.ts
}
```

## Services in Other Services:
If service A depends on service B, inject service B into service A's constructor method.
```javascript
// service A.service.ts
constructor(private serviceB: ServiceB) {}

someFunction() {
  this.serviceB.log('');
}
```
