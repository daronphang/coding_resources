## Basics:
When adding a CSS file to component, need to explicitly declare in React. When defining the class, need use className for JSX. When adding CSS files to components, they are added globally and not scoped only to the components they are added in. Can use either Styled Components or CSS Module library.

```javascript
import './ExpenseItem.css';

function ExpenseItem() {
  return (
    <div className="expense-item">
    </div>
  )
}
```

## Inline Styling:
Properties with two names must be written in camelcase as inline CSS is JS object.
```js
export default function Component () {
  const someStyle = {
    color: "white",
    padding: "10px",
    textDecoration: "none"
  }
  
  return (
    <div>
      <h1 style={{ color: "red", backgroundColor: "blue" }}>Hello Style!</h1>
      <h1 style={someStyle}>Hello Again</h1>
    </div>
  )
}
```


## Dynamic Inline Styling/Classes:
Need pass in an object. Use states to change styling for a HTML element or adding CSS classes dynamically.
```javascript
[isValid, setIsValid] = useState(true);

if(enteredValue,trim().length === 0) {
  setIsValid(false);
  return;
}

return (
  <div className={`form-control ${!isValid ? 'invalid' : ''}`}  // .form-control.invalid is a CSS class
  <label style={{ color: !isValid ? 'red' : 'black'}}   // setting inline styling by passing an object 
  
)
```

## Styled Components:
When declaring CSS files explicitly, they are not scoped to the components they are declared in. Can use 'Styled Components' package which is CSS-in-JS approach. Styles can use JS logic and stored in JS files. Has methods for all HTML tags. Guarantees every className is unique so that it doesn't spill over to other components. For different devices, use @media (condition) to set styling for mobile devices, computer etc. However, browser won't start interpreting styles until components has parsed them added them to DOM which slows down rendering. Also, absence of CSS files means cannot cache separate CSS. 
```
npm install --save styled-components
```
```javascript
import styled from 'styled-components';

const Button = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  color: ${props => (props.invalid ? 'red' : white)}; // props are set in JSX styled component
  
  & focus {   // special pseudo selector for this component only
    outline: none;
  }
`; 

return (
  <Button invalid={!isValid}>
)
```

### Passing on props:
```javascript
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

### Extending Styles (in React Material):

```javascript
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;

export default function StyledComponents() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

## CSS Module:
Buiilt into React. Simply use styles() method. Recommended way as styling is stored in .css files. Need to rename CSS files as example.module.css.

```javascript
import styles from './Button.module.css';

const Button = props => {
  return (
    <button className={styles.button}></button>   // or styles['button-control']
    <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}  // js will return 2nd element if results to true
  )
}
```
