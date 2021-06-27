## Routing:
To prevent page from reloading, use Link from react-router-dom. To add CSS class to active router link, use NavLink.

```javascript
return (
  <nav>
    <Link to='/welcome'>Welcome</Link>    // instead of using href
    // <NavLink activeClassName={class.active} to='/welcome'>
  </nav>
)
```

```
npm install react-router-dom
```

```javascript
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route path="/welcome">
        <Welcome />
      <Route path="/products">
        <Products />
    </div>
  );
}
``` 
```javascript
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRoute>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

```
