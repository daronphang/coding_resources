## React Portals

Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

When displaying modals/alert boxes, they are overlays to the entire page and in HTML, it should be above everything else instead of nested in some HTML code. Portals help to make HTML rendered semantically correct and provide a clean HTML structure persepective.

```html
<!--index.html-->
<div id="backdrop-root"></div>
<div id="overlay-root"></div>
<!--instead of nesting in HTML code-->
<div id="root"></div>
```

```javascript
import ReactDOM from 'react-dom';

const ModalOverlay = props => {
  return <place HTML modal code here>
}

const ErrorModal = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<ModalOverlay onClick={props.onConfirm} />), document.getElementById('overlay-root'))}
    </React.Fragment>
  )
}
```
