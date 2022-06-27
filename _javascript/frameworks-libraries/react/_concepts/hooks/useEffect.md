## Side Effects

Main job of React is to render UI and react to user input by evaluating JSX. Side effects are anything else including storing data in storage, sending HTTP requests, setting and managing timers, etc. These tasks must happen outside of normal component evaluation and lifecycle as they may block/delay rendering due to async nature.

## useEffect

Side effects are handled using useEffect() which is executed after every component evaluation (or after every component render cycle) if the specified dependencies change. If there is no dependency, it will only run once. Helps to deal with code that should be executed in response to something i.e. loading component, updating email etc. Gets called after the component is rendered (or mounted for class components).

For checking form validity, the useEffect() is executed upon each change in keystroke which creates unncessary network traffic. Can avoid this using a technique called debouncing through usage of cleanup functions.

```js
// function runs only once as there is no dependency provided
useEffect(() => {
    console.log("running");
}, []);

// function reruns if dependencies change
useEffect(() => {}, [dependencies]);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("isLoggedIn");
        if (storedUser) {
            setIsLoggedIn(true);
        }
    }, []);
}
```

```js
useEffect(() => {
    // function runs after cleanup function
    const identifier = setTimeout(() => {
        console.log("checking form validity");
        setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6);
    }, 500); // checks form validity after 500ms instead of every keystroke change

    // cleanup function runs BEFORE every new side effect function execution but not before first time
    // order is: checking form (triggers on initialization) -> user types -> CLEANUP -> checking form
    return () => {
        console.log("CLEANUP");
        clearTimeout(identifier); // resets the timer if the user is typing
    };
}, [enteredEmail, enteredPassword]); // will execute again either one of them changes
// dont have to add state updating functions i.e. setFormIsValid
```

### useEffect Cleanup Function

Saves applications from unwanted behaviors like memory leaks by cleaning up effects. Allows to tidy up code before component unmounts. Runs before component unmount and before execution of next scheduled effect as effects run for every render and not just once. Commonly used to cancel all subscriptions made and cancel fetch requests.

https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
