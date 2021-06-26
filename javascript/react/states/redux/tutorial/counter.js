import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  // hook executed by React redux to retrieve part of state
  // automatically setup subscription to redux store for the current component
  const counter = useSelector(state => state.counter);  
  
  const dispatch = useDispatch();
  
  const incrementHandler = () => {
    dispatch({type: 'INCREMENT'});
  }
  
  return (
    <div>{counter}</div>
    <button onClick={incrementHandler}>Increment</button>
  )
}
