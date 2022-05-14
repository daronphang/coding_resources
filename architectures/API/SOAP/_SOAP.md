## SOAP (Simple Object Access Protocol)

SOAP is a lightweight protocol that came into existence before REST used for exchanging structured information in a decentralized, distributed environment. For XML, there are no standard specifications across all programming languages for data exchange; this is where SOAP comes in.

APIs that comply with the principles of SOAP enable XML messaging between systems through HTTP or SMTP protocols. However, as XML is verbose, the amount of data transferred is enormous, hence requiring more resources (bandwidth) and slowing down communication.

### XML-RPC vs SOAP

There are two ways to implement a RPC: XML-RPC and SOAP. Both are very similar from a high-level perspective. Both utilize XML for web service method request/response encapsulation. However, XML-RPC can be described as a subset of SOAP functionality.

XML-RPC is designed to be as simple as possible, while allowing complex data structures to be transmitted, processed and returned. Uses HTTP as the transport protocol and XML as the encoding.

SOAP follows RPC style and is designed for transferring more complex sets of information and has more verbose and costly overhead. It is an XML-based protocol that consists of an envelope, a set of encoding rules and a convention for representing RPC calls and responses. SOAP tries to pick up where XML-RPC left off by implementing user-defined data types, the ability to specify the recipient, message specific processing control, and other features.

Biggest advantage SOAP has over XML-RPC is its support for the WSDL specification, which makes discovery and integration with a remote web service very straightforward. Also, SOAP has a wide range of security implementations (HTTP AUTH, WS-Security, etc) while XML-RPC is limited to basic access authentication (HTTP-AUTH).

## SOAP Message

SOAP message is composed of:

- An envelope tag that begins and ends every message.
- A body containing the request and response.
- A header if a message must determine any specifics or extra requirements.
- A fault informing of any errors that can occur throughout the request processing.

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/1999/XMLSchema">
    <SOAP-ENV:Body>
        <ns1:getAddressFromNameResponse xmlns:ns1="urn:www-oracle-com:AddressBook"
            SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <return xmlns:ns2="urn:xml-soap-address-demo" xsi:type="ns2:address">
                <city xsi:type="xsd:string">Anytown
                </city>
                <state xsi:type="xsd:string">NY
                </state>
                <phoneNumber xsi:type="ns2:phone">
                    <areaCode xsi:type="xsd:int">123
                    </areaCode>
                    <number xsi:type="xsd:string">7890
                    </number>
                    <exchange xsi:type="xsd:string">456
                    </exchange>
                </phoneNumber>
                <streetName xsi:type="xsd:string">Main Street
                </streetName>
                <zip xsi:type="xsd:int">12345</zip>
                <streetNum xsi:type="xsd:int">123
                </streetNum>
            </return>
        </ns1:getAddressFromNameResponse>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

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
