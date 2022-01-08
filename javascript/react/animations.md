### Animations

Can use ReactTransitionGroup library.

```javascript
function ExampleComponent () {
  ...
  return (
    <Transition in={this.state.modalIsOpen} timeout={300} mountOnEnter unmountOnExit>
    {state => (
      <Modal show={state} closed={this.closeModal}  />
    )}

    </Transition>
  )
}


// ModalComponent
const modal = props => {
  const cssClasses = ["Modal", props.show === 'entering' ? "ModalOpen" : props.show === 'exiting' ? 'ModalClosed' : null];
  ...
}
```
