### Routing

```html
<!--routerLink prevents page reloading by default -->
<!--routerLinkActive used to add css class to element-->
<!--routerLinkActiveOptions used to show active tab if full path is matched-->
<li rounterLinkActive="myActiveClass" [routerLinkActiveOptions]="{exact: true}">
  <a
    [routerLink]="['/users', 10, 'anna']"
    [queryParams]="{allowEdit: '1', value: '10'}"
    [fragment]="loading"
  >
    10/anna
  </a>
</li>
```

```js
onLoadServers(id: number) {
  this.router.navigate(
    ['/users', id, 'edit'],
    {
      queryParams: {allowEdit:1},
      fragment: 'loading'
    }
    );
};
```

```js
// Navigate programmatically
constructor(private router: Router, private route: ActivatedRoute) {}

onLoadServers() {
  // perform some complex calculation
  // relativeTo tells Angular what current route it is on
  this.router.navigate(['/users'], {relativeTo: this.route});
}
```

### Dynamic Routing

```js
const routes: Routes = [
     { path: 'gcp-tracking/:id', pathMatch: 'full', component: SingleCardViewComponent, canActivate: [AuthGuardService] }
]

// with query parameters
goProducts() {
  // http://localhost:4200/products?order=popular
  this.router.navigate(['/products'], { queryParams: { order: 'popular' } });
}

// to preserve query maters on any subsequent navigation action
goUsers() {
  // http://localhost:4200/users?order=popular
  this.router.navigate(['/users'], { queryParamsHandling: 'preserve' });
}
```

```html
<!--with RouterLink-->
<a [routerLink]="['/products']" [queryParams]="{ order: 'popular'}">
  Products
</a>
```

### Fetching Route Parameters

```js
// Fetching route parameters i.e. home/users/1/john
// route.ts:
const appRoutes: Routes = [
  { path: "users/:id/:name", component: UserComponent },
];
```

```js
// component.ts:
import { Subscription } from './rxjs/Subscription';

constructor(private route: ActivatedRoute) {}

user: {id: number, name: string};
paramSubscription: Subscription;

ngOnInit() {
  this.user = {
    id: this.route.snapshot.param['id'],
    name: this,route.snapshot.param['name']
  };

  // also have queryParams.subscribe() and fragment.subscribe()
  this.paramSubscription = this.route.params.subscribe((params: Params) => {   // runs when user param changes
    this.user.id = params['id'];
    this.user.name = params['name'];
  })

ngOnDestroy() {
  this.paramSubscription.unsubscribe();   // good habit but not necessary
}
}
```

### Preserving Route Parameters

```javascript
onEdit() {
     this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
}
```

### Nesting Routes

```javascript
// routing.ts
const appRoutes: Routes = [
  {
    path: "users",
    component: UserComponent,
    children: [{ path: "id", component: UserIdComponent }],
  },
];
```

```html
<!--UserComponent.html-->
<router-outlet></router-outlet>
```

### Navigate to Top When Routing

```js
// in routing module
RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" });
```

### Navigate With Anchor Tag

```js
// app.routing.module
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 100]
  })],
  exports: [RouterModule]
})
```

```html
<a routerLink="." fragment="capacity-tracking">Capacity Tracking</a>

<div id="capacity-tracking" class="single-container extended tableview">
  <app-capacity-tracking></app-capacity-tracking>
</div>
```

### Route Guards

```
CanActivate   Allows component for a given route to be activated (but not navigated to if returned false)
CanActivateChild
CanDeactivate
CanLoad     Prevent activation and routing together if returned false.
Resolve
```
