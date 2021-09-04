## Session-Based:
1. User logs in and server creates a session for user in database or server memory.
2. Session ID is stored in a cookie in client's browser and is sent along with every request made.
3. Server verifies with session data on cookie with session data stored on server-side.
4. Session cookie gets deleted when client closes browser; however, web browsers may use session restoring to make it permanent.

## Token-Based (JWT):
Widely used in RESTful APIs. Server generates encrypted JWT and sends it back to client. Client sends JWT in header as Bearer Token for every subsequent request. SHould be stored in httpOnly cookie as local storage is vulnerable to XSS attacks. For transporting tokens securely, should send it via an encrypted channel such as HTTPS.

### Local Storage for Storing JWT:
Should not use local storage for various reasons:
- Can only store string data.
- Synchronous operation which may slow down app's runtime.
- Cannot be used by web workers.
- Any JS code can access local storage and has no data protection whatsoever (huge security issue and vulnerable to XSS attacks).

Always store JWT inside httpOnly cookie (special cookie that's only sent in HTTP requests to server) and never accessible.

## Session vs JWT:
- JWT scales better as tokens are stored on client-side while session uses server memory/database which requires additional querying.
- JWT requires larger byte size (~51x compared to user session) and hence, requires more bandwidth.
- JWT requires more computing power/time to validate signatures and not ideal for single-threaded environments.
- JWTs are better for server-server and client-server communication in API services without needing to perform network validation.
- JWTs can be used to store client claims i.e. ID, department, address, etc. that cannot be modified.
- JWT is easier to implement as there are libraries in every language.
- Cannot invalidate JWT tokens until they are expired. 

### Correct Comparisons:
Session vs JWT and not Cookie vs JWT. Cookie vs Local Storage (storage mechanism).

