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
import './ExpenseItem.css';

function ExpenseItem(props) {   // props are key/value pairs
  return (
    <div className="expense-item">
      <div>{ props.date.toISOString }</div>
      <h2>{ props.title }</h2>
    </div>
  );
}

export default ExpenseItem;

// app.js:

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
