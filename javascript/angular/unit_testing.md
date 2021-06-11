## Testing:
Unittests written in Jasmine framework with Karma as test runner. 
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

imports
providers
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
Use spies for service-on-service as injecting real services can be difficult to create/control. For services with more complex logic, create mockService.

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
class MockAuthService extends AuthService {   // need mock all methods, else will get error. Use extends to overwrite partial methods.
  isLoggedIn() {
    return false;
  }
}
beforeEach(async(() => {
  TestBed.configureTestingModule({
    providers: [{ provide: AuthService, useValue: MockAuthService }]
  })
}
```


```javascript
let masterService: MasterService;
let valueServiceSpy: jasmine.SpyObj<ValueService>;

beforeEach(() => {

  const spy = jasmine.createSpyObj('ValueService', ['getValue']);

  TestBed.configureTestingModule({
    providers: [
      MasterService,
      { provide: ValueService, useValue: spy }
    ]
  });
  
  masterService = TestBed.inject(MasterService);
  valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
});

it('#getValue should return stubbed value from a spy', () => {
  const stubValue = 'stub value';
  valueServiceSpy.getValue.and.returnValue(stubValue);

  expect(masterService.getValue())
    .toBe(stubValue, 'service returned stub value');
  expect(valueServiceSpy.getValue.calls.count())
    .toBe(1, 'spy method was called once');
  expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
    .toBe(stubValue);
});
```
### HTTP Requests:
HTTPClientTestingModule mocks the http requests while testing the service. HttpTestingController is injected into tests that allows for mocking and flushing of requests. Verify() is called after each test to verify that there are no outstanding http calls.
```javascript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  const authResponse = {status: 200}

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('authenticateUser() should return status 200', () => {
    service.authenticateUser('test', '12345').subscribe((res) => {
      expect(res.status).toBe(200);
    })

    const request = httpMock.expectOne('http://127.0.0.1:5000/auth');
    expect(request.request.method).toBe('GET');
    request.flush(authResponse);
  })

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
 
import { DataService, DataStream } from './data.service';
import { Observable, from, of } from 'rxjs';
 
describe('DataService', () => {
  let service: DataService;
  let mockStream: jasmine.SpyObj<DataStream>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: DataStream, useValue: jasmine.createSpyObj('DataStream', ['dataStream']) }
      ]
    });
 
    service = TestBed.get(DataService);
    mockStream = TestBed.get(DataStream);
  });
 
  it('#getData should return value that contains test', fakeAsync(() => {
    const stream = of('testing value');
 
    mockStream.dataStream.and.returnValue(stream);
 
    let capturedValue: String = null;
 
    service.getData().subscribe(value => {
      capturedValue = value;
    });
 
    flushMicrotasks();
 
    expect(capturedValue).toBe('testing value');
  }));
 
  it('#getData should filter out value that doesn\'t have test', fakeAsync(() => {
    const stream = of('wrong value');
 
    mockStream.dataStream.and.returnValue(stream);
 
    let capturedValue: String = null;
 
    service.getData().subscribe(value => {
      capturedValue = value;
    });
 
``` 
### AuthGuard:
```javascript

// to mock ActivatedRouteSnapshot dependency
// to mock RouterStateSnapshot dependency used to obtain a protected path

// create a spy on navigate() to verify the correct work of redirection

```
