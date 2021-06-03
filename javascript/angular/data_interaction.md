## Input:
For sharing data from parent to child.
```javascript
// child.ts
export class ChildComponent {
  @Input() item: string = ''
}

//parent.html
<app-child [item]="currentItem"></app-child>  // currentItem is from parent
```
## Output:
For sharing data from child to parent.
```javascript
// child.ts
export class ChildComponent {
  @Output() : newItemEvent = new EventEmitter<string>();   // output is string type
  
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
}

// child.html
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem>    // newItem is alias for input 
<button (click)="addNewItem(newItem.value)">Add to parent's list</button>

// parent.ts
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
Main objective is to organize and share business logic, models, data and functions between different components that may/may not be related.
