### Testing Services

Firstly, should not add real service class in provider's array; always use mocks. Should have highest code coverage as they contain majority of business logic. Use spies for service-on-service as injecting real services can be difficult to create/control. For services with more complex logic, create mockService to mock dependencies. Mocks are used for behavior verification (i.e. check if correct calls are made) whereas stubs are used for state verification (i.e. return boolean, number, string).

Mock objects replace mocked class entirely (testing in isolation). Default behavior of methods is to do nothing when they are called i.e. returns null/void/default.
For spying, some methods of existing object are replaced/stubbed (partial mocking) i.e. spy real object and stub some methods. Method can return any value specified.

```
jasmine.createSpyObj('Object', ['method1', 'method2'])
spyOn(service, 'method').and.returnValue()

Chain with:
and.returnValue()                 Return any value you want as method is stubbed
and.callThrough()                 Delegates to real implementation
and.callFake(someFunction())      Pass some function to be called i..e throw error
toHaveBeenCalled()
```

```js
// if using createSpyObj, need to declare in beforeEach, else won't get executed

let mockAuthService: jasmine.SpyObj<any>;
// provide: AuthService, useValue: mockAuthService

beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['authenticateUser']);
    mockAuthService.authenticateUser.and.returnValue();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

```

```js
// dashboard.service.spec.ts:
// this dashboard service has AuthService dependency

class MockAuthService implements Partial<AuthService> {   // no need mock all methods; can also use extends
  isLoggedIn() {
    return false;
  }
}

describe('DashboardService', () => {
  let authService: AuthService;
  let dashboardService: DashboardService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService, { provide: AuthService, useClass: MockAuthService }]

    injector = getTestBed();
    dashboardService = injector.inject(DashboardService);
    authService = injector.inject(AuthService);

  })
})
```
