## Loading:
Create new component and CSS file for loading spinner. In HTML, add <app-loading-spinner>.
```javascript
// add a property in component.ts:
isFetching = false;

onGetRequest() {
  this.isFetching = true;
  // some code logic here
  
  this.isFetching = false;
}

// in html:
<p *ngIf="!isFetching">No data here</p>
<p *ngIf="isFetching">Loading...</p>

```
