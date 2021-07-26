## Cookies:
```javascript
exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1]
}

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true');
}
```
