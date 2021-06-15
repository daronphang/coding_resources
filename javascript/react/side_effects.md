## Side Effects:
Main job of React is to render UI and react to user input by evaluating JSX. Side effects are anything else including storing data in storage, sending HTTP requests,
setting and managing timers, etc. These tasks must happen outside of normal component evaluation and lifecycle as they may block/delay rendering due to async nature.

## useEffect:
Side effects are handled using useEffect() which is executed after every component evaluation if the specified dependencies change. If there is no dependency,
it will only run once. Helps to deal with code that should be executed in response to something i.e. loading component, updating email etc.

For checking form validity, the useEffect() is executed upon each change in keystroke which creates unncessary network traffic. Can debounce by using cleanup functions.

```javascript
useEffect(() => {}, [dependencies]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('isLoggedIn');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []); 
}

```

```javascript
useEffect(() => {
  setTimeout(() => {
    console.log('checking form validity'); 
    setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
  }, 500);    // checks form validity after 500ms instead of every keystroke change
  
  return () => {  // cleanup function runs before every new side effect function execution but not before first time
    console.log('CLEANUP'); 
    clearTimeout(identifier);   // resets the timer if the user is typing  
  };    
}, [enteredEmail, enteredPassword]);  // will execute again either one of them changes
     // dont have to add state updating functions i.e. setFormIsValid

```
