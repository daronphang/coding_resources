## Cookies:
Cookies are in the form of key value pairs. Can set configuration properties to cookies.
```javascript
exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1]
}

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; Secure');
}
```
```
;secure         Cookies to only be transmitted over HTTPS
;HttpOnly       Inaccessible to JS Document.cookie API i.e sent only to server and mitigate cross-site scriping attacks
;Domain=        Specifies which hosts are allowed to receive the cookie and always includes subdomains
;path=          Indicates a URL path must exist in requested URL in order to send cookie header
;max-age=       In seconds
;expires=       Date in GMT string format
;samesite=      Prevents browser from sending cookie along with cross-site requests (CSRF attacks); Strict, Lax or None
```
