import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store'; 

const Counter = () => {
  // hook executed by React redux to retrieve part of state
  // automatically setup subscription to redux store for the current component
  const counter = useSelector(state => state.counter.value);  
  const dispatch = useDispatch();
  
  const incrementHandler = () => {
    // dispatch({type: 'INCREMENT', payload: 2});    old way without toolkit
    dispatch(counterActions.increment());
  }
  
  const increaseHandler = () => {
    dispatch(counterActions.increase(10));    // 10 is stored as payload
  }
  
  return (
    <div>{counter}</div>
    <button onClick={incrementHandler}>Increment</button>
  )
}
