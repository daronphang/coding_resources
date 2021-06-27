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

## Programmatic Navigation:
Trigger navigation action such as submitting form. Can use useHistory.

```javascript
const history = useHistory();

const addQuoteHandler = (quoteData) => {
  history.push('/quotes');
}

```
## Prompt:
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

## Query Parameters:
UseLocation gives access to a location object which has info about currently loaded page.
```javascript
import { useHistory, useLocation } from 'react-router-dom'; 

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search); // search is a location property holding ? values
  
  const isSortingAsc = queryParams.get('sort') === 'asc'  // boolean
  
  const changeSortingHandler = () => {
    history.push('/quotes?=sort=' + (isSortingAsc ? 'desc' : 'asc'));   // re-renders component even if it's the same page
  }
}


```
