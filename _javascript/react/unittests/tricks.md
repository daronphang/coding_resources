### MUI
#### TextFields

If a button is disabled, a user doesn't see a disabled prop but they see nothing happen.

```js
// invalid text field
expect(textfield).toHaveAttribute('aria-invalid');

// disabled button but implementation detail
expect(getByText(/Click me/i).closest('button')).toHaveAttribute('disabled');

const Button = (props) => (
  <button 
    type="submit" 
    onClick={props.onClick} 
    disabled={props.disabled}
  >
    Click me
  </button>
);

describe('Button', () => {
  it('will call onClick when enabled', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={false} />);
    userEvent.click(getByRole('button', /click me/i));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('will not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={true} />);
    userEvent.click(getByRole('button', /click me/i));
    expect(onClick).not.toHaveBeenCalled();
  });
})
Share

```
