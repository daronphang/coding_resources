## Basics:
Query language for APIs and runtime with higher query flexibility than RESTFUL. Uses types and fields instead of endpoints. 
Key benefits of GraphQL:
1) Allows dynamic filtering of response API to avoid sending unnecessary data.
2) Allows developers to construct requests that pull data from multiple data sources in a single API call. 
3) Eliminates need for frontend to ask backend for new endpoints or changes to existing. 

### How GraphQL Works:
1. Sends POST request to /graphql single endpoint.
2. Request contains query expression to define the data that should be returned. 
3. Server-side resolver analyses request body, fetches, filters and returns relevant data to frontend.

### Operation Types:
```
Query             Retrieving data through GET
Mutation          Manipulating data with POST/PUT/PATCH/DELETE
Subscription      Setting up realtime connection via WebSockets
```

## Query Example:
```javascript
// schema.js
const { buildSchema } = require('graphql');
module.exports = buildSchema(`
  type TestData {
    text: String!
    views: Int!
  }

  type RootQuery {
    hello: TestData!
  }

  schema {
    query: RootQuery
  }
`);


// resolver.js
module.exports = {}
  hello() {
    return {
      text: 'hello world!',
      views: 123
    };
  }


// app.js
const { graphqlHttp } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver
}));


// POST request data
{
  "query": "{ hello { text views } }" 
}
```
