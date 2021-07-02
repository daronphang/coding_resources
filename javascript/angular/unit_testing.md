## Testing:
Unittests written in Jasmine framework with Karma as test runner. Best practices:
- Used for testing behaviors such as if/for loops, executing functions etc.
- Should be tested in isolation without any dependencies.
- When subscribing to Observables, to provide both success and failure callbacks.
- When testing components with services dependencies, always use mock services.
- When accessing DOM, always use debugElement and not nativeElement.
- Always use fixture.detectChanges() when making a change.
- Don't overuse NO_ERRORS_SCHEMA.


```
describe(string, function)    Function takes a title and function containing one or more specs
it(string, function)          Function takes title and function containing one or more expectations
expect(actual)                Takes a value and returns a boolean
Matcher functions             toBeTruthy(), toEqual(), toMatch(), toBe(), toContain(); chained alongside with an expect()

TestBed                       Used to configure and initialize the environment unit tests
beforeEach                    Global function in Jasmine that runs some setup code before each spec
TestBed.createComponent()     Creates an instance of component; uses expect() and matcher()
detectChanges()               Binds the data to component instance
ComponentFixture              Provides methods and proeprties that help test component's functionality

jasmine.createSpy('service')                        Used when there is no function to spy on
jasmine.createSpyObj('service', ['method'])         Used to create a mock that will spy on one ore more methods
```
```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleComponent } from './title.component';
import { UserService } from './users.service';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent]    // mocks: []UserService] converts to Jasmine spy automatically
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;    // creates an instance of class TitleComponent
    fixture.detectChanges();          // simulate running on browser environment
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// testing @Input
it('should correctly render the passed @input value', () => {
  component.message = 'New title';
  fixture.detectchanges();
  const compiled = fixture.debugElement.nativeElement;      // creates access to child element
  expect(compiled.querySelector('p').textContent).toBe('New title')';
});

// testing @Output
it('test @output', () => {
  spyOn(component.changeTitleEvent, 'emit');
  const button = fixture.nativeElement.querySelector('button');
  fixture.nativeElement.querySelector('input').value = 'Another new title';
  const inputText = fixture.nativeElement.querySelector('input').value;
  
  button.click();
  fixture.detectChanges();
  
  expect(component.changeTitleEvent.emit().toHaveBeenCalledWith(inputText);
});
```
## Testing Services:
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
```javascript
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

```javascript
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
### HTTP Requests:
HTTPClientTestingModule mocks the http requests while testing the service. HttpTestingController is injected into tests that allows for mocking and flushing of requests. Flush() is to provide dummy values as responses. Verify() is called after each test to verify that there are no outstanding http calls.
```javascript
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, {provide: Router, useValue: routerMock}]
    });

    injector = getTestBed();
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('authenticateUser() should return value if request is success', () => {
    const successResponse = {status: 200};

    service.authenticateUser('test', '12345').subscribe((res) => {
      expect(res.status).toBe(200);
    }, err => {
      expect(err === null).toBe(true);
    })

    const request = httpMock.expectOne('http://127.0.0.1:5000/auth');
    expect(request.request.method).toBe('POST');
    request.flush(successResponse);
  })

  it('authenticateUser() should throw error if request returns error', () => {
    const errResponse = {
      status: 404,
      statusText: 'failed to connect'
    };
    const errorMsg = 'An unknown error occurred.';

    service.authenticateUser('test', '12345').subscribe((res) => {
      expect(res === null).toBe(true);
    }, err => {
      expect(err).toBe(errorMsg);
    });

    const request = httpMock.expectOne('http://127.0.0.1:5000/auth');
    expect(request.request.method).toBe('POST');
    request.flush(errorMsg, errResponse);
  });

```

### Testing Observables:
Do not use done() for async functions as it may call success even if:
- Observable emits 1000x times in a loop.
- Observable errors after first emit.

Use fakeAsync() instead to run codes synchronously. Can call flushMicrotasks() to run any pending micro tasks or tick() to execute asynchronous code within that timeframe. Can
use both for promises.
```javascript
import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
 
  it('getData should return value that contains test', fakeAsync(() => {
    const stream = of('testing value');
    mockStream.dataStream.and.returnValue(stream);
    let capturedValue: String = null;
 
    service.getData().subscribe(value => {
      capturedValue = value;
    });
 
    flushMicrotasks();
 
    expect(capturedValue).toBe('testing value');
  }));
``` 

## Testing DOM:
Ensure fixture.detectchanges() is present after every DOM change. For async ngIf, use fakeasync() and tick() to control.

```javascript

```

To trigger events programmatically, can use dispatchEvent() and doesn't require fakeAync() as it is synchronous. Can also use triggerEventHandler() provided by Angular; however, it will invoke only if it was declared on native element using event bindings such as @HostListener and @Output. 
```javascript
it('should set the 😜 on mouseenter', () => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();

  const h1 = fixture.debugElement.query(By.css('h1'));
  const mouseenter = new MouseEvent('mouseenter');
  h1.nativeElement.dispatchEvent(mouseenter);

  fixture.detectChanges();
  expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText).toEqual('😜');
});
```

## Testing Form Submission:
Can either use click on native element, triggerEventHandler(), dispatchEvent() or programmatically submitting form directly.
```javascript
it('should trigger _onSearchHandler() if form is submitted', () => {
  spyOn(component, '_onSearchHandler');

  const searchFormEl = fixture.debugElement.query(By.css('#searchForm'));
  searchFormEl.triggerEventHandler('ngSubmit', null);
  fixture.detectChanges();

  expect(component._onSearchHandler).toHaveBeenCalled();
});
``` 

## Testing Nested Components:
Use technique Shallow Component Testing. Can either use one approach or combine them.

``` javascript
@Component({selector: 'app-banner', template: ''})
class BannerStubComponent {
}

TestBed
    .configureTestingModule({
      declarations: [
        AppComponent,
        BannerStubComponent,
        RouterLinkDirectiveStub
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
```

## Testing @Input/@Output:
To test child component with @Input, create a testHost for parent component and declare child component in TestBed. Also, use @ViewChild ChildComponent to access and change its properties via data binding from parent component.

```javascript
// to wrap in host component 
// ignore routing, structural directives and other services used in dashboard component

Component({
    template: 
      '<app-form-cards [_searchInputChild]="_searchInputParent" ></app-form-cards>'
  })
class TestHostDashBoardComponent {
    @ViewChild(FormCardsComponent) formCardsComponent: FormCardsComponent = new FormCardsComponent;
    _searchInputParent: string = '';
}

describe('FormCardsComponent', () => {
  let testHost: TestHostDashBoardComponent;
  let hostFixture: ComponentFixture<TestHostDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCardsComponent, TestHostDashBoardComponent ],
      imports: [ NoopAnimationsModule, MaterialModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostDashBoardComponent);
    testHost = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });
```


## Common Issues:
### Change Detection:
When modifying variables of test component, calling fixture.detectChanges() might not work due to ChangeDetectionStrategy.onPush setting. Two ways to bypass this:
1) Place fixture.detectChanges() inside each it() instead of inside beforeEach().
2) Override settings when compiling.

```javascript
  .overrideComponent( ChipsLevelsComponent, {
    set: { changeDetection: ChangeDetectionStrategy.Default }
  })
  .compileComponents();
```

For modifying properties of services, can create mock class and using array methods like push.
