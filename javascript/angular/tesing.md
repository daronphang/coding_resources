## Testing:
Unittests written in Jasmine framework with Karma as test runner. 
```
describe(string, function)    Function takes a title and function containing one or more specs
it(string, function)          Function takes title and function containing one or more expectations
expect(actual)                Takes a value and returns a boolean
Matcher functions             Chained alongside an expect(), examples are toBeTruthy(), toEqual(), toContain()

TestBed                       Used to configure and initialize the environment unit tests
beforeEach                    Global function in Jasmine that runs some setup code before each spec
TestBed.createComponent()     Creates an instance of component; uses expect() and matcher()
detectChanges()               Binds the data to component instance
ComponentFixture              Provides methods and proeprties that help test component's functionality
```
```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent]
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
Use spies as injecting real services can be difficult to create/control.
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
```javascript
// testing HTTPclient
httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])

beforeEach(() = {
  httpClientSpy.get.and.returnValue(responseMsg);
});

it('should return status 200' (done: DoneFn) => {
  const successResponse = {
    status: 200
  };
  
  httpClientSpy.get.and.returnValue(successResponse);
  
  authService.authenticateUser().subscribe(
    successRes => {
      expect(sucessRes.status).toEqual(200);
      done();
    };
    error => done.fail
  );
});

it('should return status 404' (done: DoneFn) => {
  const errorResponse = {
    status: 404
  };
  
  httpClientSpy.get.and.returnValue(errorResponse);
  
  authService.authenticateUser().subscribe(
    successRes => done.fail()
    error => {
      expect(error.status).toEqual(404);
      done();
    }
  );
});

```
