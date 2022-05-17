### SSO (Single Sign-On)

A common approach to authentication and authorization is to use some sort of single sign-on (SSO) solution. Examples include SAML and OpenID.

When a principal tries to access a resource, the person is directed to authenticate with an Identity Provider. Once the Identity Provider is satisfied, it gives information to the service provider, allowing it to decide whether to grant the principal access to resource.

The Identity Provider may be an externally or internally hosted system. For enterprises, it is common to have your own IdP, which may be linked to your company's directory service such as LDAP or AD.

SAML is SOAP-based standard and is known for being fairly complex to work with despite the libraries and tooling available to support it. OIDC is a standard that has emerged as a specific implementation of OAuth2.0 and uses simpler REST calls. It is likely to make inroads into enterprises but the biggest stumbling block is the lack of IdPs that support it.

### SSO Gateway

Within a microservices setup, each service could decide to handle the redirection/handshaking with the IdP. However, this could mean a lot of duplicated work. Instead, can use a gateway to act as a proxy that sits between your services and the outside world. Hence, you can centralize the behavior for redirecting the user and perform handshake in one place.

If using HTTP, can make use of Shibboleth tool to handle the problem of sending information about principals to downstream services.
