### Unittesting

Testing individual building blocks (functions, components) in isolation.

### Integration

Test the combination of multiple building blocks.

### End-to-End

Test a series of steps i.e. logging in and navigating to page.

### Tools

Use Jest for running tests and asserting results, and React Testing Library for simulating/rendering React app/components. Both are setup when using "create-react-app".

Tests are not executed in browser but in Jest environment and hence, do not need to import expect() or describe() as they are already available globally in Jest environment.

https://jestjs.io/docs/expect

https://jestjs.io/docs/mock-function-api

### Testing Philosophy

- Many integration tests, no snapshot tests, few unit tests, few e-to-e tests.
- Write mostly integration and not unit as they don't really resemble the way your end user interacts with the app.
- Do not test implementation details such as name of functions and variables, and whether nested components are rendered, or how many times they are rendered.
- shallow() for unittesting and mount/render() for integration testing.
- Tests should test functionality of app, that mimic how it will be used by end users.
- Leave 3rd party library tests to authors.

https://kentcdodds.com/blog/avoid-nesting-when-youre-testing

### Example

Arrange, your app is in a certain original state. Act, then something happens like click event, input, etc. Lastly assert, or make a hypothesis of the new state of your app.

```js
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

afterEach(cleanup);

// describe is for testing suite
describe("Greeting component", () => {
  test("some testing", () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText("Hello world", { exact: false });
    expect(helloWorldElement).not.toBeInTheDocument();
  });

  test("testing user interaction and state", () => {
    render(<Greeting />);
    // userEvent helps to trigger events on screen
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // getByText will fail if not found, use queryByText instead which returns null
    const output = screen.queryByText("hello");
    expect(output).toBeNull();
  });

  test("async component", async () => {
    // overriding built in fetch()
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => ["hello", "world"],
    });

    render(<Async />);

    // if expect multiple list items, need getAllByRole instead of getByRole
    const listItemElements = await screen.getAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
```
