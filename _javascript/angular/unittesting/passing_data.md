### Testing @Input/@Output

To test child component with @Input, create a testHost for parent component and declare child component in TestBed. Also, use @ViewChild ChildComponent to access and change its properties via data binding from parent component.

```js
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
