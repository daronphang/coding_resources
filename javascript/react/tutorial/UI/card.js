// card.js:
// reusuable wrapper component
import './card.css';

function Card(props) {
  const classes = 'card ' + props.className;  // anything received from outside as className is added
  
  return <div className={classes}>{props.children}</div>
  // content between opening/closing of custom tags is represented by props.children
}

export default Card;
