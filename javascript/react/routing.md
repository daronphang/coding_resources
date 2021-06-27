## Routing:
To prevent page from reloading, use Link from react-router-dom. To add CSS class to active router link, use NavLink.

```
npm install react-router-dom
```

```javascript
return (
  <nav>
    <Link to='/welcome'>Welcome</Link>    // instead of using href
    // <NavLink activeClassName={class.active} to='/welcome'>
  </nav>
)
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

## Dynamic Links:
To make full use, need extract route params.
```javascript
impor { Route, Switch, Redirect } from 'react-router-dom';

return (
  <Switch>    // loads the first one that matches, not specificity
    <Route path='/' exact><Redirect to='/welcome' /></Route>
    <Route path='/product' exact>    // exact tells React to load if it matches exactly
      <Product />
    </Route>
    <Route path='/product/:productId'>    // if navigate to this, both products and productDetail routes will be active if no Switch
      <ProductDetail />
    </Route>
  </Switch>
)
```

```javascript
import { useParams }  from 'react-router-dom';

const ProductDetail = () => {
  const params = useParams();
  console.log(params.productId);
  
  return (
    
  )
}

export default ProductDetail;

```

## Nested Routes:
Adding Routes to individual components and not just on main component.

## Fallback Route:
Add Route at the end to match all other incoming requests.

```javascript
<Route path='*'><NotFound /></Route>
```
