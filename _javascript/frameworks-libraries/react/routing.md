### Routing

To prevent page from reloading, use Link from react-router-dom. Do not use href. To add CSS class to active router link, use NavLink.

```
$npm install react-router-dom
```

```js
import { Link, NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function Welcome() {
  return (
    <nav>
      <Link to='/welcome'>Welcome</Link>
      <NavLink activeClassName={class.active} to='/welcome' />

      <IconButton>
         <Link to='/cart' style={{ color: 'white'}}><ShoppingCartIcon /></Link>
      </IconButton>
    </nav>
  )
}

```

```js
// app.js to define routes
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

```js
// activate routes in index.js
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRoute>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

```

### Passing Props to Routes

```js
return (
  <Route
    path="/home"
    component={() => <HomePageComponent handleNavBar={handleNavBar} />}
  />
);
```

### Dynamic Routes

Can extract route params with react-router-dom.

```javascript
import { Route, Switch, Redirect } from "react-router-dom";

return (
  <Switch>
    {" "}
    // loads the first one that matches, not specificity
    <Route path="/" exact>
      <Redirect to="/welcome" />
    </Route>
    <Route path="/product" exact>
      {" "}
      // exact tells React to load if it matches exactly
      <Product />
    </Route>
    <Route path="/product/:productId">
      {" "}
      // if navigate to this, both Product and ProductDetail routes will be active
      if no Switch
      <ProductDetail />
    </Route>
  </Switch>
);
```

```js
// ProductDetail.js
// extract the productId parameter
import { useParams }  from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  // const params = useParams();
  // console.log(params.productId);

  return ()
}

export default ProductDetail;

```

### Query Parameters

UseLocation gives access to a location object which has info about currently loaded page.

```js
import { useHistory, useLocation } from "react-router-dom";

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search); // search is a location property holding ? values

  const isSortingAsc = queryParams.get("sort") === "asc"; // boolean

  const changeSortingHandler = () => {
    history.push("/quotes?=sort=" + (isSortingAsc ? "desc" : "asc")); // re-renders component even if it's the same page
  };
};
```

### Nested Routes

Adding Routes to individual components and not just on main component. Can use useRouteMatch() to adjust nested routes using path property.

### Fallback Route

Add Route at the end to match all other incoming requests.

```javascript
<Route path="*">
  <NotFound />
</Route>
```

### Programmatic Navigation

Trigger navigation action such as submitting form. Can use useHistory. Can also be used for redirecting with history.replace('/home').

```javascript
const history = useHistory();

const addQuoteHandler = (quoteData) => {
  history.push('/quotes');

  // can also pass in an object
  history.push({
    pathname: location.pathname,
    search: '?sort=${(isSortingAsc ? 'desc' : 'asc')}`
  });
}

```

### Prompt

```javascript
import { Prompt } from 'react-router-dom';

const QuoteForm = (props) => {
  const [isEntered, setIsEntering] = useState(false);

  const formFocusedHandler = () => {
    setIsEntering(true);
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  }

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location)=> 'Do you want to leave page?'}/>
      <form onFocus={formFocusedHandler}>
      <button onClick={finishEnteringHandler}></button>
    </Fragment>
  )
}
```

### Adding Auth Guards

```javascript
return (
  {!auth.ctx.isLoggedIn && (<Route path='/auth'><AuthPage /></Route>)}
  <Route path='/home'>{authctx.isLoggedIn && <Home />}</Route>)}
  <Route path='*'><Redirect to='/error'</Route>    // or redirect to home page
)
```
