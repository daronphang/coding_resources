## OAuth 2.0:
Industry-standard protocol for authorization. 

## Roles:
1) Resource Owner/User: Account owner granting third-party websites to access his account data.
2) Client: Third-party application.
3) Resource Server: Database server containing information of resource owners; requires access token from Authorization Server.
4) Authorization Server: Generates access token after user grants permission to client. 

## Client Registration:
1) Client application provides callback URL to Facebook.
2) After registration, Facebook provides client ID and secret.

## Workflow:
1. User signs in to Authorization Server through callback URL.
2. Server responds with authorization grant back to user.
3. User grants access to server give details to client. 
4. Authorization Server responds with access token.
5. Client sends request to Resource Server with attached access token.
6. If token is valid, Resource Server responds with user details (limited to scope) back to client.  

