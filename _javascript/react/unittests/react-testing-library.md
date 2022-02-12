### React Testing Library

Light-weight solution for testing React components. Rather than dealing with instances of rendered React components, test will work with actual DOM nodes. However, library is not a test runner or
framework.

https://testing-library.com/docs/react-testing-library/api

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

https://kentcdodds.com/blog/how-to-test-custom-react-hooks

https://github.com/threepointone/react-act-examples/blob/master/sync.md

### Setup/Teardown

For each test, want to render React tree to a DOM element that's attached to document so that it can receive DOM events. When test ends, should execute cleanup, otherwise may be leaky and change behavior of another test.

```js
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

beforeAll(() => {});
afterAll(() => {});
```

### Act

Tasks like rendering, user events, or data fetching can be considered as "units" of interaction with a user interface. react-dom/test-utils provides a helper called act() that makes sure all updates related to these "units" have been processed and applied to the DOM before making any assertions.

However, can be verbose; to avoid boilerplate code, can use React Testing Library whose helpers are wrapped with act() including render and fireEvent.

```js
act(() => {
  // render components
});
// make assertions
```

### Query

Recommended to query by actual text than using test IDs or other mechanisms. Else, have to do extra work to make sure translations are getting applied correctly. Benefit is that you get increased confidence.

The 'name' option allows you to query elements by their 'Accessible Name' which is what screen readers will read for the element and works if element has its text split up by different elements.

https://testing-library.com/docs/queries/about/

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles

```js
// ❌
// assuming you've got this DOM to work with:
// <label>Username</label><input data-testid="username" />
screen.getByTestId("username");

// ✅
// change the DOM to be accessible by associating the label and setting the type
// <label for="username">Username</label><input id="username" type="text" />
screen.getByRole("textbox", { name: /username/i });
```

Number one recommended approach to query component's output is ByRole.

```js
// assuming we've got this DOM structure to work with
// <button><span>Hello</span> <span>World</span></button>

screen.getByText(/hello world/i);
// ❌ fails with the following error:
// Unable to find an element with the text: /hello world/i. This could be
// because the text is broken up by multiple elements. In this case, you can
// provide a function for your text matcher to make your matcher more flexible.

screen.getByRole("button", { name: /hello world/i });
// ✅ works!
```

### Render

Render into a container which is appended to document.body. By default, will append div. However, can append other elements such as <table> if needed.

```js
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders a message", () => {
  const { container, getByText } = render(<Greeting />);
  expect(getByText("Hello, world!")).toBeInTheDocument();
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Hello, World!</h1>
  `);
});
```

### Screen

Benefit of using screen is that you no longer need to keep render call destructure up-to-date as you add/remove the queries you need.

```js
const { getByRole } = render(<Example />);
const errorMessageNode = getByRole("alert");

// better
render(<Example />);
const errorMessageNode = screen.getByRole("alert");
```
