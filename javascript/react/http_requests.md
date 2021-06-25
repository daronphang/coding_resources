## Example:
```javascript

function App() {
  const [error, setError] = useState(null);

  async fetchMoviesHandler = () => {
    setisLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://example.com', {});
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('error message')
      }

      const movies = data.results.map((movieData) => {
        return {id: movieData.id, name: movieData.name}
      })
    } catch (error) {
      setError(error.message);
    }
    }
}

```
