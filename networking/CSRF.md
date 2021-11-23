## CSRF:
Type of attack which tricks the victim to do malicious task on a victim's authenticated web application on behalf of attacker's interests. Exploits the concept that if the user is authenticated, all requests that come from user must be originated by the user. Attacker exploits this concept by identifying the session cookie and use that to send his own payload to run on the application. Only works if the user is authenticated.

### CSRF Attack using POST:
1. User logs into web application and receives cookie as response after authentication.
2. User visits malicious website that sends POST request to vulnerable site and not to malicious site when user clicks on submit button.
3. User browser will send authentication cookie with request.
4. Server validates user and performs operation.

### Anti-CSRF Tokens:

### Same-Site Cookies:
Though a cookie can set to same-site, not all modern browsers support them while older browsers do not support web applications that make use of same-site cookies.
