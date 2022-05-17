## OAuth

Oauth is an authorization framework and not an authentication protocol. It is an open standard for authorization that grants secure delegated access to applications, devices, APIs and servers via access tokens. OAuth authorizes an application to access your data without giving it access to your credentials. Can be used with either SAML or OIDC.

- Users don't need to remember their credentials (only need to authorize the app to access their info for selected OAuth provider).
- Prevents security holes as user doesn't provide passwords for sign in/sign up.
- Able to handle non-web clients.

### Parties in OAuth Mechanism

1. Resource Owner: User who is trying to log in.
2. Consumer/Client: Application the user wants to log into.
3. Express Server: Client backend server.
4. Resource Server: Hosts the protected resources such as user's profile; requires access token from Authorization Server.
5. Authorization Server: Responsible for authenticating user and providing access token to clients.

### OAuth2 Workflow for Client-side JS Applications

1. User requests authorization from Authorization Server through their gateway/auth URL and enters credentials.
2. URL includes query parameters that indicate the type of access being requested including client_id, redirect_url, and scope.
3. Authorization Server asks permission from User who thereby grants access for Client to access the user's data.
4. Authorization Server authorizes User and redirects to redirect/callback URL (backend/frontend server) with request token.
5. Backend Server sends GET/POST request to Authorization Server's access token URL with request token to exchange for access token.
6. Access token is used to authenticate future requests sent to Resource Server.
7. Authorization Server sends response to redirect_uri specified with access token in #hash fragment parameter.
8. Client uses access token to request user's profile from Resource Server in Bearer Authorization header.
9. Client validates user's existence in its database, responds with user's details (limited to scope) and redirects to application's page.

### Alternative Workflow Involving Client-Side

Authorization flow vs implicit flow. In implicit flow, client browser receives access token (passed as hash# which can only be read using JS running in browser) from Authorization Server of Social Providers but is potentially exposed to XSS attacks. With authorization flow, browser only gets temporary auth code but never the access or refresh token.

https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670

https://datatracker.ietf.org/doc/html/rfc6749

```
GET /drive/v2/files HTTP/1.1
Host: www.googleapis.com
Authorization: Bearer access_token
```

Need to register application with OAuth provider first.

https://developers.google.com/identity/protocols/oauth2
https://www.loginradius.com/blog/async/google-authentication-with-nodejs-and-passportjs/
https://morioh.com/p/e37dfcf12462  
https://medium.com/authpack/facebook-auth-with-node-js-c4bb90d03fc0  
https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#login
