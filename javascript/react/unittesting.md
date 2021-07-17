## Unittesting:
Jest and React Testing library. To test, run npm test in terminal. Use three 'A's for writing tests:
1) Arrange: Setup test data, test conditions and environment.
2) Act: Run logic that should be tested i.e. executing function.
3) Assert: Compare execution results with expected results.

Screen gives access to virtual DOM. Have three types of functions:
1) Get(): throws error if not found.
2) query(): Does not throw any error.
3) Find(): Returns promise.

```javascript
// greeting.test.js
import { Render, screen } from '@testing-library/react'; 
import Greeting from './Greeting';

test('renders Hello world as a text', () => {
  // arrange
  render(<Greeting />);
  
  const helloWorldEl = screen.getByText('Hello World', {exact: true});
  expect(helloWorldEl).toBeInTheDcoument();
})
```
