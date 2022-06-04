## Form Validation

```css
.ng-select-is-invalid,
.input-is-invalid,
.textarea-is-invalid {
  border: 1px solid #dc3545;
  border-radius: 0.25rem;
  position: relative;
}

.ng-select-is-valid,
.input-is-valid,
.textarea-is-valid {
  border: 1px solid #28a745;
  border-radius: 0.25rem;
  position: relative;
}

.ng-select-is-invalid:after,
.input-is-invalid:after,
.textarea-is-invalid:after {
  font-family: 'Font Awesome 5 Free';
  color: #dc3545;
  position: absolute;
  font-weight: 900;
  font-size: 1rem;
  top: 5px;
  right: 25px;
  padding-right: 10px;
  content: '\f057';
}

.ng-select-is-valid:after,
.input-is-valid:after,
.textarea-is-valid:after {
  font-family: 'Font Awesome 5 Free';
  color: #28a745;
  position: absolute;
  font-weight: 900;
  font-size: 1rem;
  top: 5px;
  right: 40px;
  padding-right: 10px;
  content: '\f058';
}
```
