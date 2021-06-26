import { useSelector } from 'react-redux';

const Counter = () => {
  // hook executed by React redux to retrieve part of state
  // automatically setup subscription to redux store for the current component
  const counter = useSelector(state => state.counter);  
  
  return (
    <div>{counter}</div>
  )
}
