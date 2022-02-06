### Testing Nested Components

Use technique Shallow Component Testing. Can either use one approach or combine them.

```js
@Component({ selector: "app-banner", template: "" })
class BannerStubComponent {}

TestBed.configureTestingModule({
  declarations: [AppComponent, BannerStubComponent, RouterLinkDirectiveStub],
  schemas: [NO_ERRORS_SCHEMA],
});
```
