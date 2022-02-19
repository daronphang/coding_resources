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
// app.js
import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

const About = () => <div>You are on the about page</div>;
const Home = () => <div>You are home</div>;
const NoMatch = () => <div>No match</div>;

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export const App = () => (
  <div>
    <Link to="/">Home</Link>

    <Link to="/about">About</Link>

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route>
        <NoMatch />
      </Route>
    </Switch>

    <LocationDisplay />
  </div>
);
```

```js
test("landing on a bad page", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText(/no match/i)).toBeInTheDocument();
});

test("rendering a component that uses useLocation", () => {
  const history = createMemoryHistory();
  const route = "/some-route";
  history.push(route);
  render(
    <Router history={history}>
      <LocationDisplay />
    </Router>
  );

  expect(screen.getByTestId("location-display")).toHaveTextContent(route);
});
```

```js
// test utils file
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

import { MemoryRouter } from "react-router-dom";

test("full app rendering/navigating", () => {
  render(<App />, { wrapper: MemoryRouter });

  // verify page content for expected route
  expect(screen.getByText(/you are home/i)).toBeInTheDocument();
});
```

### Modals

```js
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

const Modal = ({ onClose, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => modalRoot.removeChild(el);
  });

  return ReactDOM.createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <hr />
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
};

test("modal shows the children and a close button", () => {
  // Arrange
  const handleClose = jest.fn();

  // Act
  const { getByText } = render(
    <Modal onClose={handleClose}>
      <div>test</div>
    </Modal>
  );
  // Assert
  expect(getByText("test")).toBeTruthy();

  // Act
  fireEvent.click(getByText(/close/i));

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1);
});
```
