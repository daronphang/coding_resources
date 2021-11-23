## CSRF:
Type of attack which tricks the victim to do malicious task on a victim's authenticated web application on behalf of attacker's interests. Exploits the concept that if the user is authenticated, all requests that come from user must be originated by the user. Attacker exploits this concept by identifying the session cookie and use that to send his own payload to run on the application. Only works if the user is authenticated.

### CSRF Attack using POST:
1. User logs into web application and receives cookie as response after authentication.
2. User visits malicious website that sends POST request to vulnerable site and not to malicious site when user clicks on submit button.
3. User browser will send authentication cookie with request.
4. Server validates user and performs operation.

### Anti-CSRF Tokens:
CSRF tokens prevent CSRF as attacks are unable to create valid requests to backend server without token. Should be generated on server-side. Can be generated once per user session or for each request (may result in usability concerns when user clicks on "Back" button which may contain a CSRF token that is invalid). CSRF token should not be transmitted using cookies but through custom headers (more secure than hidden input field).

Server must always check that the CSRF value submitted by form (set in URL/body/header) must match with the token stored as cookie/session. Need to set as HttpOnly. Workflowfor csurf in Node Express:
1. User navigates for first time to website and server sets CSRF token and secret as cookies.
2. For POST/PATCH/PUT/DELETE request, server will check secret against the value of CSRF token sent by client.
3. Though CSRF token will be sent back by client as cookie, server will ignore as it will only look for it in request body/query string/headers.
4. Code that generates res.cookie('XSRF-TOKEN', req.csrfToken()) should be run once (per session).

https://david-silva.medium.com/how-to-implement-csrf-protection-on-a-jwt-based-app-node-csurf-angular-bb90af2a9efd
https://dbillinghamuk.medium.com/csrf-setup-for-expressjs-and-ssr-react-redux-app-348e65261009
https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html

### Same-Site Cookies:
Though a cookie can set to same-site, not all modern browsers support them while older browsers do not support web applications that make use of same-site cookies.
