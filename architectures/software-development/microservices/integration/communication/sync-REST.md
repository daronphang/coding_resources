## REST

REST is an architectural style inspired by the Web. Most important is the concept of resources, which is a thing that the service itself knows about. The server creates different representations of the resource on request. How a resource is shown externally is completed decoupled from how it is stored internally i.e. client might ask for JSON representation of a Customer but stored in binary.

REST doesn't talk about the underlying protocols, but it is most commonly used over HTTP as it gives us parts of the specification including verbs. For other protocols, you will need to handle them yourself.

## REST/HTTP

HTTP brings a large ecosystem of supporting tools and technology, with caching proxies like Varnish and load balancers like mod_proxy. Also get to use all the available security controls with HTTP to secure your communications.

HTTP can also be used to implement RPC i.e. SOAP gets routed over HTTP, but uses very little of the specification where verbs and HTTP error codes are ignored.

### HATEOAS (Hypermedia As the Engine of Application State)

A concept whereby a piece of content contains links to various other pieces of content in a variety of formats i.e. text, images, sounds. Idea behind HATEOAS is that clients should perform interactions (potentially leading to state transitions) with the server via these links to other resources.

The client only needs to know where to navigate to the resource; changing the URI and location doesn't affect the client i.e. progressively discovery of the API. Hence, this promotes loose coupling between client and server.

However, one of the downsides is that the navigation of controls can be quite chatty as the client needs to follow links to find the operation it wants to perform.

### JSON/XML/Binary/HTML

JSON is a more popular content type for services that work over HTTP than XML. Nonetheless, XML defines link control as a hypermedia control while JSON doesn't have concrete standards, though there are formats such as HAL that attempt to fix this. XML is also able to extract certain parts of the payload using XPATH which has lots of tool support as compared to JSONPATH that is not widely supported.

## Downsides

### Beware of too much convenience

As REST becomes more popular, so have the frameworks that help create RESTful web services. However, some of these tools trade off too much in terms of short-term gain for long-term pain by encouraging bad behaviors for faster setup.

For instance, some frameworks make it very easy to take database representations of objects, deserialize them into in-process objects, and then directly expose them externally. The inherent coupling that this setup promotes will cause far more pain than the effort required to properly decouple these concepts.

Sometimes we may not know how best to store our data and expose to consumers; one way is to delay the implementation of proper persistence for the microservice until the interface has stabilized enough. For an interim period, the data can be stored in a file on a local disk. This ensures that how the consumers wanted to use the service drove the design and implementation decisions.

### Downsides to REST over HTTP

In terms of ease of consumption, you cannot easily generate a client stub for your REST over HTTP like you can with RPC.

In terms of performance, though REST over HTTP payloads can be more compact than SOAP as it supports alternative formats like JSON/binary, it will still be nowhere near as lean as a binary protocol as Thrift might be.

While HTTP can be suited well to large volumes of traffic, it isn't great for low-latency comunications when compaared to alternative protocols that are built on top of TCP or other networking technology i.e. WebSockets.

For server-to-server communications, if extreme low latency or small message size is important, HTTP communications may not be a good idea in general. You may need to pick different underlying protocols such as UDP (User Datagram Protocol), and many RPC frameworks can run on top of networking protocols other than TCP.
