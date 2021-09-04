## Data Storage:
### Cookies:
Mainly used for three purposes:
1) Session management: Storing logins, shopping carts, game scores the server should remember.
2) Personalization: User preferences, themes, and other settings.
3) Tracking: Recording and analyzing user behavior.

Employed to store user data (password, preferences, IP address, date/time of visit, etc). Cookies are sent from server via response header. When user loads website, browser sends cookies back to server to notify website of user's previous activity. Have certain life span defined by creators. Stored in server and client browser. Clients can manipulate cookies and hence, should not store sensitive data. On every page visited, cookies can also be sent to another page/server for tracking purposes. Works well together with sessions. Expires when browser is closed on default.

### Cache: 
Temporary storage of web documents such as HTML pages and images in client's browser. Purpose is to reduce bandwidth usage, server load and browser loading. Web cache system stores copies of documents passing through it; subsequent requests may be satisfied from cache if conditions are met. Cache is kept indefinitely. 

### Session: 
Data is stored on server and not on client. Cannot be viewed/manipulated by users and hence, useful for storing sensitive data that should survive across requests. Sessions are identified via Cookies which has an \_id value. Can either be saved on server's memory or in database. 

### Local Storage:
Store data without an end.

## Error Handling:
For synchronous code, use try-catch; then-catch for asynchronous. Can also throw errors to trigger in catch block.
