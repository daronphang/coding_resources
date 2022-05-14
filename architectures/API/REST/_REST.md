## REST

Unlike SOAP which is a protocol, REST is an architectural style for an API that uses HTTP requests to access and process data. Considered a simpler alternative to SOAP which many developers find difficult to use as it requires writing a lot of code to complete every task and following XML structure for every message sent (verbose).

RESTful systems support messaging in different formats including plain text, HTML, YAML, XML, and JSON, while SOAP only allows XML.

Examples of frameworks include Flask, Falcon and Django.

## Criteria/Constraints

1. Clear separation between client and server.
2. Client request must contain all information that is necessary to carry it out.
3. Stateless client-server communication, meaning no client information is stored between get requests.
4. Responses from server can be cacheable or noncacheable for streamlining client-server interactions.
5. Layered system with proxy servers, caches or gateways inserted between servers and clients.
6. Code-on-demand whereby clients can download code optimally from server to execute in their context.

## Resources

Concept of resources is core to the REST architectural style. A resource is an item of interest in the domain of the application i.e. users, blog posts, and comments are resources of blogging application. It is an object with a type, associated data, relationships to other resources, and a set of methods that operate on it (POST/GET/PUT/DELETE).

A resource is usually something that can be stored on a computer and represented as a stream of bits i.e. a dcoument, text file, images, videos, row in database, or the result of running an algorithm.

Each resource must have a unique identifier (URLs for HTTP), and one can request this resource by providing its URL.

## Request Methods/Verbs

Create, read, update and delete. Four major functions for interacting with database applications of persistent storage. REST APIs often involve the use of CRUD functions, but are not limited to them.

```
GET         Obtain the resource
POST        Create a new resource or add it to the collection
PUT         Modify an existing resource
HEAD
DELETE
PATCH
CONNECT
TRACE
OPTIONS
```

## Request and Response Bodies

Resources are sent back and forth between client and server in the bodies of requests and responses in either JSON or XML. Headeres and parameters are also important in HTTP request as the contain important identifier information as to the request's metadata, authorization, URI, caching, cookies etc.

Request: request.get_json(), request.headers.get('your header name')  
Response: jsonify(response)

## Common Headers

```
Authorization       Base64(username:password)
WWWW-Authenticate   Sent by server
Accept-Charset
Content-Type        application/json (response type sent to client by server)
Cache-Control
```

## Benefits

### Decoupled client and server

REST allows for better abstraction than RPC. A system with abstraction levels is able to encapsulate its details to better identify and sustain its properties. This makes REST API flexible enough to evolve over time while remaining a stable system.

### Discoverability

Communication between client and server describes everything so that no external documentation is required to understand how to interact with a REST API.

### Cache-friendly

Reusuing a lot of HTTP tools, REST is the only style that allows caching data on the HTTP level.

### Multiple formats support

The ability to support multiple formats for storing and exchanging data is one of the reasons REST is currently a prevailing choice for building public APIs.

## Drawbacks

### No single REST structure

There is no exact right way to build a REST API and hence, making it difficult in practice.

### Big payloads (over and under-fetching)

REST returns a lot of rich metadata so that the client can understand everything necessary about the state of the application just from its responses. It can also contain not enough of the necessary data and hence, often create the need for another request.
