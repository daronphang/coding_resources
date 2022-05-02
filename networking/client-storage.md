### Cookies

HTTP is stateless protocol; each request doesn't store any state or persisting information. However, if need to remember user's session, can use cookies. Cookies are assoicated with websites i.e. cannot access cookie_a in another website_b. Have two types: persistent and session cookies. Mainly used for three purposes:

1. Session management: Storing logins, shopping carts, game scores the server should remember.
2. Personalization: User preferences, themes, and other settings.
3. Tracking: Recording and analyzing user behavior.

Employed to store user data (password, preferences, IP address, date/time of visit, etc). Cookies are sent from server via response header. When user loads website, browser sends cookies back to server to notify website of user's previous activity. Have certain life span defined by creators. Stored in server and client browser. Clients can manipulate cookies and hence, should not store sensitive data. On every page visited, cookies can also be sent to another page/server for tracking purposes. Works well together with sessions. Expires when browser is closed on default.

Client cannot access cookie if HttpOnly flag is true. Has SSL support. Data are transferrred on each HTTP request.

#### IMPORTANT

For browser to set cookies from cross-site origin, need to configure:

1. setCredentials to true from client side for all requests to server (login and post login).
2. Set Access-Control-Allow-Credentials to true in server-side.

https://medium.com/swlh/how-the-new-chrome-80-cookie-rule-samesite-none-secure-affects-web-development-c06380220ced

### Local Storage

Store data without an end.

### Session Storage

Accessible from client-side only and has no SSL support. Unlike cookies where they are sent on each request, local and session storage data sits in browser until someone requests for it. Session storage data are gone when browser tab is closed.

### Cache

Temporary storage of web documents such as HTML pages and images in client's browser. Purpose is to reduce bandwidth usage, server load and browser loading. Web cache system stores copies of documents passing through it; subsequent requests may be satisfied from cache if conditions are met. Cache is kept indefinitely.

### Session:

Data is stored on server and not on client. Cannot be viewed/manipulated by users and hence, useful for storing sensitive data that should survive across requests. Sessions are identified via Cookies which has an \_id value. Can either be saved on server's memory or in database.

### Error Handling

For synchronous code, use try-catch; then-catch for asynchronous. Can also throw errors to trigger in catch block.
