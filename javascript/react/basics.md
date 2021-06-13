## Basics:
React is a JS library used for building user interfaces; focus is on components (reusuable building blocks) consisting mainly of JS and HTML. React is written in Declarative way y defining the desired end/target state, and let React figure out the actual DOM instructions. Though react can be used to control parts of HTML pages, more common is the Single-Page-Application (SPA) approach whereby it controls the entire frontned of a web application. Server only sends one HTML page, and React takes over and controls the UI.

Data is passed from one component to another via props or properties. 

```
npx create-react-app my-app
cd my-app
npm start
```
## Template:

```javascript
// ExpenseItem.js
import ExpenseDate from './ExpenseDate';

function ExpenseItem(props) {   // props are key/value pairs
  return (
    <div className="expense-item">
      <ExpenseDate>dateProxy={props.date}</ExpenseDate>   // or <ExpenseDate /> if there is no content
      
      <h2>{ props.title }</h2>
    </div>
  );
}

export default ExpenseItem;
```

```javascript
// ExpenseDate.js
function ExpenseDate(props) {  

const month = props.dateProxy.toLocaleString('en-US', {month: 'long'});
const day = props.dateProxy.toLocaleString('en-US', {day: '2-digit'});
const year = props.dateProxy.getFullYear();

  return (
  <div>
      <div>{month}</div>
      <div>{day}</div>
      <div>{year}</div>
  </div>
  );
}

export default ExpenseDate;
```

```javascript
// app.js:
import './ExpenseItem.css';

function() {
  const expenses = [
  {title: 'Car Insurance', date: new Date(2021, 2, 28)},
  {title: 'Utility', date: new Date(2021, 3, 28)},
]

return (
  <div>
    <ExpenseItem>
      title={expenses[0].title}
      date={expenses[0].date}
    </ExpenseItem>
  </div>
)
}
```
