## Styling:
Use states to change styling for a HTML element.
```javascript
[isValid, setIsValid] = useState(true);

if(enteredValue,trim().length === 0) {
  setIsValid(false);
  return;
}

return (
  <label style={{ color: !isValid ? 'red' : 'black'}}
)
```
