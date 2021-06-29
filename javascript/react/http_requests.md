## Example:
If want to execute HTTP request as the page loads, use useEffect() and useCallback() to prevent infinite loop in dependencies. When using fetch(), can include methods (POST,GET), body and headers objects.
```javascript

function App() {
  const [error, setError] = useState(null);
  
  useEffect(()=> {    // don't call when component gets re-evaluated, else inifinite loop
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);   // only gets executed when dependencies change
  
  function addMovieHandler(movie) {
    fetch('http://example.com', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
       }
    })
  }

  const fetchMoviesHandler = useCallback(async () => {
    setisLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://example.com', {});
      
      if (!response.ok) {
        throw new Error('error message')
      }
      
      const data = await response.json();
      
      const movies = data.results.map((movieData) => {
        return {id: movieData.id, name: movieData.name}
      })
    } catch (error) {
      setError(error.message);
    }
  }, []);
}

```
