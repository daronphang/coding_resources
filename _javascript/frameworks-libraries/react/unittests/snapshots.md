### Snapshot Testing

Snapshot tests are very useful tool whenever you want to make sure your UI does not change unexpectedly.

Instead of rendering the graphical UI which requires building React App, can use test renderer to quickly generate a serializable value for React tree. Snapshot case renders a UI component, takes a snapshot, and then compares it to a reference snapshot file stored alongside the test.

The snapshot artifact should be committed alongside code changes. On subsequent test runs, Jest will compare the rendered output with previously stored snapshot.

To regenerate snapshot artifacts if UI has an intentional implementation change. Can input testNamePattern flag to regenerate that particular snapshot only.

```console
jest --updateSnapshot --testNamePattern<>
```

```js
import React from "react";
import renderer from "react-test-renderer";
import Link from "../Link";

it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

```js
// snapshot file that is created when it is run the first time
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

### Best Practices

#### Tests should be deterministic

If have component that renders current data i.e. Date.now(), can mock the function to ensure it returns a consistent value everytime the test is run.

```js
Date.now = jest.fn(() => 1482363367071);
```
