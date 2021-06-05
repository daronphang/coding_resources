## Loading Spinner:
Create new component and CSS file for loading spinner. In HTML, add <app-loading-spinner>.

```javascript
// app-component.ts:
isFetching = false;

onGetRequest() {
  this.isFetching = true;
  // some code logic here
  
  this.isFetching = false;
}
```
```html
// component.html:
<p *ngIf="!isFetching">No data here</p>
<div *ngIf="isFetching" class="lds-ring"><div></div><div></div><div></div><div></div></div>
```
