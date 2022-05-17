## SAML (Security Assertion Markup Language)

SAML is an XML-based (SOAP) open SSO standard for transferring identity data between two parties: an Identity Provider (IdP) and a Service Provider (SP). Hence, you can use one set of credentials to log into many different websites.

- Identity Provider: Performs authentication and passes the user's identity and authorization level to the service provider i.e. Auth0.
- Service Provider: Trusts the IdP and authorizes the given user to access the requested resource that could be internal or external i.e. Salesforce, Jira, AWS, Expensify, etc.

Most organizations already know the identity of users as they are logged in to their Active Directory domain or intranet. Hence, it makes sense to use this information to log users into external services.

### Improved user experience

Users only need to sign in one time to access multiple service providers. This allows for faster authentication process and less expectation of the user to remember multiple login credentials for every application.

### Increased security

SAML provides a single point of authentication, which happens at a secure Service Provider. SAML then transfers the identity information to the service providers. This form of authentication ensures that credentials are only sent to the IdP directly.

### Loose coupling of directories

SAML doesn't require user information to be maintained and synchronized between directories.

## How Does SAML Work?

User's identity is exchanged via digitally signed XML documents.

- User tries to access a resource from SP.
- SP responds by generating a SAML request.
- Browser redirects user to an SSO URL provided by IdP.
- IdP parses the SAML request and authenticates the user and generates a SAML response.
- IdP returns encoded SAML response to the browser.
- Browser sends SAML response to SP for verification.
- If verification is successful, user will be logged into the SP.
