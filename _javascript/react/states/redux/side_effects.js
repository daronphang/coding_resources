import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Reducers must be pure, side-effect free, synchronous functions; hence, can either place them in components with useEffect() or inside Action creators.

// component:
const isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  
  useEffect(()=> {
    const sendCartData = async () => {
      const response = await fetch('http://example.com', {method: 'PUT', body: JSON.stringify(cart)});
      
      if (!response.ok) {throw new Error('failed')}
    
      const responseData = await response.json();
    };
    
    if (isInitial) {
      isInitial = false;
      return;
    }
     
    sendCartData().catch()  // catch any errors from http request
    
    }, [cart]); // re-executes when cart changes

  return (
    // some code here
  )

}




