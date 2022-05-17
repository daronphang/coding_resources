## OIDC (OpenID Connect)

OIDC extends the OAuth protocol so that client services verify user identities and exchange profile information through OpenID providers via RESTful APIs (HTTPs) that dispatch JWTs to share information during the authentication process. It addresses the lack of an authentication mechanism in OAuth, which is a weakness when it comes to authorizing sensitive transactions like payments.

Many developers are attracted to this approach as it is highly scalable, flexible across platforms, and relatively simple to implement. OIDC was designed with web and mobile applications in mind.

OIDC is built on top of the OAuth2.0 framework, which is a standard that grants third-party apps and services access to user ID resources. No user credentials are sent over the wire or stored on third-party servers, which increases security and ease of use for IT administrators.

### Scopes

With OpenID, you choose to associate information with your OpenID (controlling shared information) that can be shared with the websites you visit (scopes). Examples of scopes include profile, address, email, etc.

Your password is only given to your Identity Provider, and that provider then confirms your identity to the websites you visit. Other than your provider, no website ever sees your password.

### Who Controls OpenID?

OpenID is decentralized and not owned by anyone. Anyone can choose to use an OpenID or become an OpenID Provider for free without having to register or be approved by any organization. Examples of Identity Providers are Google, OpenAM and Gluu.
