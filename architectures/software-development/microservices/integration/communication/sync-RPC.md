## RPC

RPC refers to the technique of making a local call and having it execute on a remote service somewhere. Some of this technology relies on having an interface definition (SOAP, Thrift, protocol buffers). The use of a separate interface definition can make it easier to generate client and server stubs for different technology stacks.

RPC implementations that allow you to generate client and server stubs help you get started very fast i.e. you can send content over a network boundary in no time. However, they do come with some downsides.

### Technology coupling

Some RPC mechanisms, like Java RMI,are heavily tied to a specific platform which can limit which technology can be used in client and server. Though Thrift and protocol buffers have an impressive amount of support for alternative languages, they sometimes come with restrictions on interoperability. Technology coupling can be a form of exposing internal technical implementation details.

### Too much abstraction

Though the core idea of RPC is to hide the complexity of a remote call (making it look like a local call), many implementations hide too much. You can make a large number of local calls without worrying overly about performance. However, with RPC, the cost of marshalling and unmarshalling payloads can be significant. Hence, need to think differently about API design for remote interfaces versus local interfaces.

### Brittleness

Changes to server stubs such as adding new methods to an object require client stubs to be updated/regenerated if they are consuming the new methods. Additionally, depending on the nature of changes, consumers that don't need the new method may also need to have their stubs upgraded too.

Changes like this are fairly common, and RPC endpoints will eventually end up having a large number of methods for different ways of creating or interacting with objects.

Another form of brittleness is serialization. If the server implementation decides to add/remove fields of a particular type, even though consumers do not use that field, code associated with deserializing the object on the consumer side will also need to change, else it will break. Both client and server need to have fields matched. Hence, rolling out changes require both client and server to redeployed at the same time.

This is a key challenge with any RPC mechanism that promotes the use of binary stub generation i.e. client and server deployments are not separated. Types that are exposed may end up having a mass of fields, some of which are no longer used but can't be safely removed.

### Is RPC terrible?

Many operations actually fall quite nicely into the RPC-based model, and more modern mechanisms like protocol buffers or Thrift mitigate the downsides by avodiing the need for lock-step releases of client and server code.

Nonetheless, need to be aware of the potential pitfalls associated with RPC. Don't abstract your remote calls to the point where the network is completely hidden, and ensure that you can evolve the server interface without having to insist on lock-step upgrades for clients.
