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
When declaring CSS files explicitly, they are not scoped to the components they are declared in. Can use 'Styled Components' package. Has methods for all HTML tags. Guarantees every className is unique so that it doesn't spill over to other components. Styling stored in js files. For different devices, use @media (condition) to set styling for mobile devices, computer etc.
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
