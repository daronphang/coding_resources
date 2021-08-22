## Basics:
An authentication protocol used to authenticate users in an application by using another service provider. Three parties in any OAuth mechanism:
1) Client: User who is trying to log in.
2) Consumer: Application the client wants to log into.
3) Service Provider: External application that authenticates user's identity through their Oauth2 API.

## Overiew:
1) Client requests authorization from Service Provider through their gateway URL.
2) Service Provider authorizes client and redirects to Consumer's redirect URL with request token.
3) Consumer sends POST request to Service Provider using request token to obtain access token.
4) Service Provider redirects to Consumer's application page with access token and client is authorized.

## NodeJS Example:
Client ID is the identity of Consumer who is accessing the OAuth service (registered through their portal). Client secret will also be issued and is used together with request token to obtain access token (get information about the user). 

Below example passes access token to user; however, should create session token that is sent to user as cookie. Server will maintain a mapping of Session Tokens: Access Tokens in database. 

```
OAuth URL                 "https://github.com/login/oauth/authorize?client_id=myclientid123&redirect_uri=http://localhost:8080/oauth/redirect"
SP with request token     "http://localhost:8080/oauth/redirect?code=code123requesttoken"
POST request to SP        "https://github.com/login/oauth/access_token"
```

```html
<!DOCTYPE html>
<html>
  <body>
    <a
      href="https://github.com/login/oauth/authorize?client_id=myclientid123&redirect_uri=http://localhost:8080/oauth/redirect"
    >
      Login with github
    </a>
  </body>
</html>
```

```js
const express = require("express");

const clientID = "<your client id>";
const clientSecret = "<your client secret>";

app.get("/oauth/redirect", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    res.redirect(`/welcome.html?access_token=${accessToken}`);
  });
});

app.use(express.static(__dirname + "/public"));
app.listen(8080);
```
