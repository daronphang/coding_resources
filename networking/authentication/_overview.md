### OIDC vs SAML vs OAuth

Both SAML and OIDC are identity protocols that make SSO (Single Sign-On) possible, and are industry standards for federated authentication. Either protocol may be the basis for Identity Providers that offer a range of identity management and services and may be used for SSO applications.

Main difference between all three is that OAuth is used in **access authorization** while SAML and OIDC are used in **user authentication**.

Between OIDC and SAML:

- OpenID lacks user authorization data (such as permissions) and focuses primarily on identity assertion, while SAML is an identity data exchange and is very feature-rich.
- Authentication is decentralized with OpenID.
- SAML uses assertions vs OpenID and Oauth architecture of ID tokens.
- OIDC is designed for API workloads and can be used to secure APIs.
