## Basics:
State management library built into React. Need create consumer and provider.

### Consumer: 
Consumer is where the stored information ends up. It can request data via the provider and manipulate the central store if the provider allows it.

### Provider:
Acts as a delivery service. When a consumer asks for something, it finds it in the conext and delivers it to where it's needed. 


Can use React hook or consumer to listen to contexts. 

```javascript
// MyContext.js
// equivalent to store method of Redux

const MyContext = React.createContext();
export default MyContext;
```
```javascript
//MyProvider.js

import MyContext from './MyContext';

class MyProvider extends Component {
    state = {
        cars: {
            car001: { name: 'Honda', price: 100 },
            car002: { name: 'BMW', price: 150 },
            car003: { name: 'Mercedes', price: 200 }
        }
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    cars: this.state.cars,
                    incrementPrice: selectedID => {
                        const cars = Object.assign({}, this.state.cars);
                        cars[selectedID].price = cars[selectedID].price + 1;
                        this.setState({
                            cars
                        });
                    },
                    decrementPrice: selectedID => {
                        const cars = Object.assign({}, this.state.cars);
                        cars[selectedID].price = cars[selectedID].price - 1;
                        this.setState({
                            cars
                        });
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

```

```javascript
// App.js

class App extends Component {
    render() {
        return (
            <MyProvider>    // wrap provider around app
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to my web store</h1>
                    </header>
                    <ProductList />
                </div>
            </MyProvider>
        );
    }
}

```

```javascript
// Cars.js

const Cars = () => (
    <MyContext.Consumer>
        {context => (
            <Fragment>
                <h4>Cars:</h4>
                {Object.keys(context.cars).map(carID => (
                    <Car
                        key={carID}
                        name={context.cars[carID].name}
                        price={context.cars[carID].price}
                        incrementPrice={() => context.incrementPrice(carID)}
                        decrementPrice={() => context.decrementPrice(carID)}
                    />
                ))}
            </Fragment>
        )}
    </MyContext.Consumer>
);

```


```javascript
// store/auth-context.js
import React from 'react'; 

React.createContext({
  isLoggedIn: false   // if set default value, don't need provider, just use consumer
});

export default AuthContext; 


// app.js:

return (
  <React.Fragment>
  <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>    // to wrap everything with AuthContext as it is needed everywhere 
  ...
  </AuthContext.Provider> 
)

// navigation.js:
import React, { useContext } from 'react';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
}

return (
  <AuthContext.Consumer> 
  {(ctx) => {
    return (
      ...place code here
      ctx.isLoggedIn
    )
  }}
  
  </AuthContext.Consumer> 
)
```
