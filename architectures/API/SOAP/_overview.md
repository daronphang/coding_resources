## SOAP (Simple Object Access Protocol)

SOAP is a lightweight protocol that came into existence before REST used for exchanging structured information in a decentralized, distributed environment. APIs that comply with the principles of SOAP enable XML messaging between systems through HTTP or SMTP. However, as XML is verbose, the amount of data transferred is enormous, hence requiring more resources (bandwidth) and slowing down communication.

## XML (Extensible Markup Language)

XML is a simple and flexible text format widely used for data storage and exchange over the internet or other networks. XML defines a set of rules for encoding documents in a format that both humans and machines can read. Enforces strict validation and can be reliably processed by programs.

XML is a markup language similar to HTML, but without predefined tags to use. Instead, you define your own tags designed specifically for your needs. Essentially, HTML was designed to focus on the presentation of content, while XML was designed to store data as structured information.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<message>
    <warning>
         Hello World
    </warning>
</message>
```

## SOAP Message

SOAP message is composed of:

- An envelope tag that begins and ends every message.
- A body containing the request and response.
- A header if a message must determine any specifics or extra requirements.
- A fault informing of any errors that can occur throughout the request processing.

## Benefits

### Language and platform-agnostic

The built-in functionality to create web-based services allows SOAP to handle communications and make responses language and platform independent.

### Supports variety of transport protocols

Flexible in terms of transfer protocols to accomodate for multiple scenarios.

### Built-in error handling

SOAP API specification allows for returning the Retry XML message with error code and explanation.

### Enhanced security

Integrated with WS-Security protocols, SOAP meets an enterprise-grade transaction quality. Provides privacy and integrity inside the transacations while allowing for encryption on the message level. Its rich security features remain irreplaceable for billing operations, booking systems, and payments.

## Drawbacks

### XML only and heavyweight

SOAP messages contain a lot of metadata and only support verbose XML structures for requests and responses. Requires a large bandwidth.

### High learning curve

Building SOAP API requires a deep understanding of all protocols involved and their highly restricted rules.

### Tedious message updating

Requires additional effort to add or remove the message properties. Rigid SOAP schema slows down adoption.
