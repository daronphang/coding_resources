### Fetch

If want to execute HTTP request as the page loads, use useEffect() and useCallback() to prevent infinite loop in dependencies. When using fetch(), can include methods (POST,GET), body and headers objects.

```javascript
function App() {
  const [error, setError] = useState(null);

  useEffect(() => {
    // don't call when component gets re-evaluated, else inifinite loop
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); // only gets executed when dependencies change

  function addMovieHandler(movie) {
    fetch("http://example.com", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const fetchMoviesHandler = useCallback(async () => {
    setisLoading(true);
    setError(null);

    try {
      const response = await fetch("http://example.com", {});

      if (!response.ok) {
        throw new Error("error message");
      }

      const data = await response.json();

      const movies = data.results.map((movieData) => {
        return { id: movieData.id, name: movieData.name };
      });
    } catch (error) {
      setError(error.message);
    }
  }, []);
}
```

### Axios

Data fetching library that has following benefits:

- Good defaults to work with JSON data (auto conversion of request body to JSON string).
- Lesser boilerplate code.
- Better error handling.
- Can be used on server/client.

To disable duplicate requests, remove React.StrictMode in index.js.

```js
ReactDOM.render(
  <React.StrictMode>
    {" "}
    // REMOVE THIS
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

```js
import axios from "axios";
import React from "react";

export default function App() {
  const login = () => {
    axios
      .post("http URL", jsonData)
      .then((response) => {
        console.log(response); // response.data, response.status, response.headers
      })
      .catch((err) => {
        console.log(err); // err.response
      });
  };
}
```
