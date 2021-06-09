## Testing:
Unittests written in Jasmine with Karma as test runner. 
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// testing @Input
it('should correctly render the passed @input value', () => {
  component.message = 'New title';
  fixture.detectchanges();
  const compiled = fixture.debugElement.nativeElement;
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
