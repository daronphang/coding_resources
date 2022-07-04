## React

React is a JS library used for building user interfaces; focus is on components (reusuable building blocks) consisting mainly of JS and HTML. React is written in Declarative way defining the desired end/target state, and let React figure out the actual DOM instructions. Though react can be used to control parts of HTML pages, more common is the Single-Page-Application (SPA) approach whereby it controls the entire frontend of a web application. Server only sends one HTML page, and React takes over and controls the UI.

```console
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

## Components

Can be defined as a function or ES6 class.

```js
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

```js
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

## Lifecycles

It is important to free up resources taken by components when they are destroyed. Each React component has a lifecycle which consists of three phases:

-   Mounting: putting elements into the DOM.
-   Updating: involves methods for updating components in the DOM.
-   Unmounting: removing a component from the DOM.

```
// class-based
componentDidMount       Behavior before component is added to the DOM
componentDidUpdate      Behavior when component receives new state/props
componentWillUnmount

// functional-based
useEffect               Can be used as all three lifecycle methods
```

```js
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    // runs after the component output has been rendered to the DOM
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    // tearing down
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Clock />);
```

```js
import React, { useEffect } from "react";

const Component = ({ foo }) => {
    useEffect(() => {
        console.log("Behavior before the component is added to the DOM");
    }, []);

    useEffect(() => {
        console.log("Behavior when the value of 'foo' changes.");
    }, [foo]);

    useEffect(() => {
        // if a function is returned from useEffect, that function is invoked only
        // when the component is removed from the DOM
        return () => {
            console.log("Behavior right before the component is removed from the DOM.");
        };
    }, []);

    return <h1>Hello World</h1>;
};
```

## Handling Events

With JSX, need to pass a function as the event handler and not a string.

Full list of events: https://reactjs.org/docs/events.html#mouse-events.

```javascript
function Todo(props) => {
  // document.querySelector('button').addEventListener('click');   this is imperative approach, not declarative

  return (
    <div>
      <button className="button" onClick={function()}></button>
    </div>
  )
}

```

## Lifting State Up

Sometimes we have state that's located within a particular component that also needs to be shared with sibling components. Instead of using an entire state management library like Redux or React Context, can just lift state up to closest common ancestor (parent component as a single source of truth) and pass both state variables and values down through props to update the state.

## Listening to User Input

Use onChange().

```javascript

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);  // always return a string
  };

  const submitHandler = (event) => {
    event.preventDefault();   // prevent page from reloading
    const expenseData = {
      title: enteredTitle,    // points to states
      date: new Date(enteredDate)
    }
    enteredTitle = ''; // clear submitted form
  }

  return (
    <form onSubmit={submitHandler}>
      <input value={enteredTitle} type="text" onChange(titleChangeHandler) /> // value allows two-way binding
  )
}

// for multiple states:
const [userInput, setUserInput] = useState({
    enteredTitle: '',                             // pass an object
    enteredDate: '',
    })

const titleChangeHandler = (event) => {
  setUserInput((prevState) => {
    return {...prevState, enteredTitle: event.target.value}   // overrides title and ensures others are not thrown away
  });

}
```

## Converting string into HTML

Use dangerouslySetInnerHTML function.

```js
const productDescription = `
        <div>
            <p>
                When a split second can mean the difference between victory and defeat,
                the absolute speed of the Razer Huntsman Tournament Edition is what 
                separates the champions from everyone else. Designed and tested by Team Razer athletes, 
                this gaming keyboard is armed with the fastest Razer switches we’ve ever designed, to 
                give you the edge you need to thrive where the competition is fiercest.
            </p>
            <br />
            <p>
                RAZER™ LINEAROPTICAL SWITCH
            </p>
            <br />
            <p>
                With 1.0mm optical actuation that registers at the speed of light, expect nothing but instant response from every keystroke, as you react and execute clutch plays with clinical efficiency.
                Tested to have an industry-leading durability of up to 100 million keystrokes, the Razer™ Linear Optical Switches are also well-equipped to withstand the rigors of training and competitive play.
            </p>
        </div>
        `;

return <div dangerouslySetInnerHTML={{ __html: productDescription }}></div>;
```

## Uncontrolled/Stateless

Stateless/dumb components are those that do not have hold any states.
If the logic or data is handled in parent component, the child component is uncontrolled.
