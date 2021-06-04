## Error Handling:
```javascript
private handleError(errorRes: HTTPErrorResponse) {
  let errorMsg = 'An unknown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMsg);
    }
  
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMsg = 'This email exists already';
      break;
    }
    case 'PASSWORD_INVALID':
      errorMsg = 'Password is incorrect';
      break;
}
```
