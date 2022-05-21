## Caching

A commonly used performance optimization whereby the previous result of some operation is stored, so that subsequent requests can use this stored value rather than spending time and resources recalculating the value, and eliminating needless round-trips to databases.

### Client, Proxy and Server Caching

In client-side caching, the client stores the cached result. With proxy caching, a proxy is placed between client and server such as using a reverse proxy or content delivery network (CDN). With server-side caching, the server handles caching responsibility, such as making use of a system like Redis Memcache, or simple in-memory cache.

Reverse proxies like Squid or Varnish can sit transparently on the network between client and server, storing and expiring cached content if required. CDNs like AWS's CloudFront or Akamai can ensure that requests are routed to cahces near the calling client, making sure that that traffic doesn't go halfway round the world where it needs to.

### Caching in HTTP

With HTTP, can use **cache-control** directives in our responses to clients. These tell clients if they should cache the resource at all and the duration of it. You also have the option of using an **Expires** header.

For GET requests, can use Entity Tags or ETags to determine if the value of a resource ha changed. For instance, an update to a resource would mean URI remains the same, but the ETag should be changed. Server sends a 304 Not Modified response if we have up-to-date version of resource.

### Caching for Resilience

Caching can be used to implement resiliency in case of failure. With client-side caching, if the downstream service becomes unavailable, the client could decide to use cached but potentially stale data.

### Keep it simple

Be careful about caching in too many places as this increases the staleness of data, and harder to determine the freshness of data that a client eventually sees.
