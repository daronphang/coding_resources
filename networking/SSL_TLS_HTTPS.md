## SSL Certificate:
Stands for Secure Sockets Layer, standard technology for keeping an internet connection secure, safeguarding sensitive data that is being sent via packets between two systems, and preventing attackers from reading and modifying data that is transferred. Data exchange applies between client to client, client to server, and server to server. Browsers will only trust SSL certificates issued by authorized issuers (Certificate Authorities) such as DigiCert.

### How SSL Works:
Encryption uses asymmetrical cryptography which requires public and private keys. Both keys are related to each other by complex mathematical formula that is difficult to reverse-engineer by brute force. 

## TLS:
Transport Layer Security. An updated, more secure version of SSL. Asymmetrical cryptography requires significant computing resources; encrpyting all information would be expensive. TLS gets around this by using it at beginning of communications session whereby the server and client agrees on single session key that will be used to encrypt packets from that point forward. Session/shared key is established using asymmetrical cryptography, and data is encrypted with shared key which uses symmetrical crpytography and is much less computationally intensive. Session keys are only used once. 

### TLS Handshake:
1. Client contacts server and requests a secure connection and server responds with list of cipher suites.
2. Cipher suites are a collection of algorithms that work together to securely encrypt connection with website. 
3. Client compares against its own cipher suites, decides on one that is mutually supported and informs server.
4. Server provides its digital certificate issued by third-party authority confirming the server's identity which contains public key.
5. Client sends a random string and premaster secret (random string) that is encrypted with public key and server decrypts with private key.
7. Server also sends random string to client. 
8. TLS Handshake is established whereby both client/server use client random, server random and premaster secret to generate session keys.
9. Session keys generated are client write key, server write key, client write MAC key, and server write MAC key. 
10. Client uses its session write key to encrypt data, and server decrypts using same key (symmetric cryptography).

## HTTPS:
Hyper Text Transfer Protocol secure. Appears in URL when a website is secured by an SSL/TLS certificate. 
