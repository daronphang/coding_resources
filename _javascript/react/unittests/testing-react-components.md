### useLocation

```js
const mockUseLocationValue = {
  pathname: "/testroute",
  search: "",
  hash: "",
  state: null,
};
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));
```

### useHistory

```js
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
```

### React Router
To reduce boilerplate, can use wrapper option to wrap a MemoryRouter around the component you want to render. MemoryRouter works when you don't need access to the history object itself in the test, but just need the components to be able to render and navigate. If you don't need to change history, can use BrowserRouter.

https://testing-library.com/docs/example-react-router/

```js
test('landing on a bad page', () => {
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  render(
    <Router history={history}>
      <App />
    </Router>,
  )

  expect(screen.getByText(/no match/i)).toBeInTheDocument()
})

test('rendering a component that uses useLocation', () => {
  const history = createMemoryHistory()
  const route = '/some-route'
  history.push(route)
  render(
    <Router history={history}>
      <LocationDisplay />
    </Router>,
  )

  expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})
```

```js
// test utils file
const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}

import {MemoryRouter} from 'react-router-dom'

test('full app rendering/navigating', () => {
  render(<App />, {wrapper: MemoryRouter})

  // verify page content for expected route
  expect(screen.getByText(/you are home/i)).toBeInTheDocument()
})
```
