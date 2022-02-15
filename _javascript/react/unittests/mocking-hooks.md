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
