## GraphQL

A query language for APIs developed by Facebook. Allows clients to detail the exact data it needs and simplifies data aggregation from multiple sources, so the developer can use one API call to request all needed data. Resolves the problem of under-fetching or over-fetching that the existing SOAP and REST protocols had. Both GraphQL and SOAP is strong data typing and hence, ensures better communication between applications.

## Benefits

### Typed schema

GraphQL publishes in advance what it can do, which improves its discoverability.

### No versioning

While REST offers multiple API versions, GraphQL uses a single, evolving version that gives continuous access to new features and contributes to cleaner, more maintainable server code.

### Detailed error messages

Error messages includes all the resolvers and refers to the exact query part at fault.

### Flexible permissions

Allows for selectively exposing certain functions while preserving private information. REST architecture doesn't reveal data in portions; it is either all or nothing.

## Drawbacks

### Slower performance

Trades off complexity for its power. Having too many nested fields in one request can lead to system overload and hence, REST remains a better option for complex queries.

### Caching complexity

As GraphQL isn't reusing HTTP caching semantics, it reuqires a custom caching effort such as Apollo Client.
