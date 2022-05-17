## API Key

An API key is a token that a client provides when making API calls. API keys are for projects, while authentication tokens are identifying and verifying users that are using the application.

API keys provide project authorization but not authentication:

- **Project identification**: identify the application/project calling the API.
- **Project authorization**: check whether the calling app has been granted access to call API and has enabled the API in their project.

API keys are not as secure as authentication tokens, but they identify the application calling the API. By identifying, you can use API keys to associate usage information with that project.

### Usage

Can be sent over in the query string, headers or as cookies.

```
GET /hello/world/api_key=12345

GET/hello/world
X-API-Key: 12345

Cookie: X-API-KEY=12345
```

### Security

API keys are generally not considered secureas they hav no expiration date, are typically accessible to clients and hence, can be easily stolen.

### When to Use

- You want to block anonymous traffic.
- You want to share data publicly but do not want users to abuse it i.e. control the number of calls made to your API.
- You want to identify usage patterns in your API's traffic.
- You want to filter logs by API key.

Cannot be used for:

- Identifying individual users.
- Secure authorization.
- Identifying the creators of a project.
