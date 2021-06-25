## State Updates: 
When a state is updated, React schedules it with the new state; however, it does not immediately get executed but gets put on priority list i.e. listening to user input has higher
priority than changing text on screen. Can have multiple outstanding scheduling at the same time. Hence, need to always use function for state changes that depends on previous state. Alternative way is to use useEffect() which always runs whenever there is a change in state.

```javascript
setShowParagraph((prevShowParagraph) => !prevShowParagraph);
```
