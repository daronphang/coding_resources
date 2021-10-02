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

## Passing on props:
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

## Extending Styles (in React Material):

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

## Using Keyframes:
```js
import styled, { keyframes } from 'styled-components'

const breatheAnimation = keyframes`
 0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
`

const Circle = styled.div`
 animation-name: ${breatheAnimation};
 animation-duration: 8s;
 animation-iteration-count: infinite;
`

// Passing props to keyframes by using a function

const fadeIn = (opacity) => keyframes`
 0% { opacity: 0 }
 100% { opacity: ${opacity} } 
`;


```
