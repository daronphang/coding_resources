### CSS Classes

When adding a CSS file to component, need to explicitly declare in React. When defining the class, need use className for JSX. When adding CSS files to components, they are added globally and not scoped only to the components they are added in. Can use either Styled Components or CSS Module library.

```js
import "./ExpenseItem.css";

function ExpenseItem() {
  return <div className="expense-item"></div>;
}
```

### Inline Styling

Properties with two names must be written in camelcase as inline CSS is JS object. Cannot specify pseudo-classes using inline styles i.e. :focus, :hover, :active, etc.

```js
export default function Component() {
  const someStyle = {
    color: "white",
    padding: "10px",
    textDecoration: "none",
  };

  return (
    <div>
      <h1 style={{ color: "red", backgroundColor: "blue" }}>Hello Style!</h1>
      <h1 style={someStyle}>Hello Again</h1>
    </div>
  );
}
```

### Dynamic Inline Styling/Classes

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

### CSS Module

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
