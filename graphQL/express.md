### Basics

Query language for APIs and server-side runtime for executing queries using type system. Has more query flexibility than RESTFUL. Uses types and fields instead of endpoints.

Key benefits of GraphQL:

1. Allows dynamic filtering of response API to avoid sending unnecessary data.
2. Allows developers to construct requests that pull data from multiple data sources in a single API call.
3. Eliminates need for frontend to ask backend for new endpoints or changes to existing.

### How GraphQL Works

1. Create schema to describe the complete APIs type system; each API call is validated against the schema.
2. Create root resolver that contains mapping of actions to functions.
3. Sends POST request to /graphql single endpoint.
4. Request contains query expression to define the data that should be returned.
5. Server-side resolver analyses request body, fetches, filters and returns relevant data to frontend.

### Operation Types

```
Query             Retrieving data through GET
Mutation          Manipulating data with POST/PUT/PATCH/DELETE
Subscription      Setting up realtime connection via WebSockets
```

### Query Example

```javascript
// schema.js
const { buildSchema } = require('graphql');
module.exports = buildSchema(`
  type TestData {
    text: String!
    views: Int!
  }

  type RootQuery {
    hello123: TestData!
  }

  schema {
    query: RootQuery
  }
`);


// resolver.js providing a function for each API endpoint
module.exports = {
  hello123() {
    return {
      text: 'hello world!',
      views: 123
    };
  }
}

// app.js
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,        // provides GUI on browser
}));
app.listen(3000);


// POST request data
{
  "query": "{ hello123 { text views } }"
}
```

### Mutations

```javascript
// schema.js
module.exports = buildSchema('
  type Post {
    _id: ID!
    title: String!
    content: String!
  }

  type User {
    _id: ID!
    name: String!
    password: String
    status: String!
    posts: []
  }

  input UserInputData {     // interface for data and type used as argument
    email: String!
    name: String!
    password: String!
  }

  type PostData {
    posts: [Post!]!
    totalPosts: Int!
  }

  type RootMutation {
    createUser(userInput: UserInputdata): User!     // specify response layout as type User
    createPost(postInput: PostInputData): Post!
  }

  type AuthData {
    token: String!
    userId: String!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    posts: PostData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
');
```

```javascript
// resolver.js
const User = require('../models/user');

module.exports = {
  createUser: async function({ userInput }, req) {
    // const email = args.userInput.email
    const existingUser = await User.findOne({email: userInput.email});
    if (existingUser) {
      const error = new Error('user exists already');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();  // using mongodb
    return { ...createdUser._doc, _id: createdUser._id.toString() };    // _doc returns data without metadata
  }
  login: async function({ email, password }) {
    // some code authenticating user in database
    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    }, 'secret key', { expiresIn: '1h'});
    return { token: token, userId: user._id.toString() };
  }
};
```

```graphql
mutation {
  createUser(userInput: {email: "hello@gmail.com", name: "john", password: "123"}) { _id email }   // returns _id and email only
}
```

### Connecting with Frontend

```javascript
const graphqlQuery = {
  query: `
    mutation {
      createUser(userInput: {email: "${email}", name: "${name}", password: "${password}"}) { _id email }
    }`
}

fetch('http://localhost:8000/graphql, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(graphqlQuiery)
}).then(resData => {
  if (resData.errors) {
    throw new Error('user validation failed');
  }
}).catch();


// app.js
// setup required as express graphql declines automatically if it is not POST/GET request
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // other CORS setup
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
})
```

### Input Validation

Can define custom errors with formatError() in setting up GraphQL at backend.

```javascript
// defining custom errors
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
  formatError(err) {
    if (!err.originalError) {return err;}
    const data = err.originalError.data;
    const message = err.message || 'an error occured';
    const code = err.originalError.code || 500;
    return {
      message: message,
      status: code,
      data: data
    }
  }
}));


const validator = require('validator');

errors = [];
if (!validator.isEmail(userInput.email)) {
  errors.push({msg: 'email is invalid'});
};

if (!validator.isEmpty(userInput.password) || validator.isLength(userInput.password, {min: 5}) {
  errors.push({msg: 'password is invalid'});
}

if (errors.length > 0) {
  const error = new Error('invalid input');
  error.data = errors;
  error.code = 422;
  throw error;
}
```

### Variables

Can assign query to any name with variables specified in arguments.

```javascript
const graphqlQuery = {
  query: `
    query FetchPosts($page: Int) {
      posts(page: $page) {
        _id
        title
      }
    }`,
  variables: {
    page: this.page,
  },
};
```

### Aliases and Fragments

To query results for the same field, use aliases. To avoid repeating same set of fields in mutliple queries, use Fragments which are reusuable units (similar to deconstructing arrays with spread operator). Need to assign values to parameters.

```graphql
query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
      course1: course(id: $courseID1) { ...courseFields },
      course2: course(id: $courseID2) { ...courseFields }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

{
    "courseID1":1,
    "courseID2":2
}
```
