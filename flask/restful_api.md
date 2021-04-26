# RESTful API:
An architectural style for an API that uses HTTP requests to access and process data. 

## Resources:
Concept of resources is core to the REST architectural style. A resource is an item of interest in the domain of the application i.e. users, blog posts, and comments are resources
of blogging application.

Each resource must have a unique identifier (URLs for HTTP). 
### Request Commands:
1) **GET**: Obtain the resource
2) **POST**: Create a new resource or add it to the collection. Server chooses URL of new resource and returns it in "Location" header
3) **PUT**: Modify an existing resource
4) **DELETE**

## Request and Response Bodies:
Resources are sent back and forth between client and server in the bodies of requests and responses in either JSON or XML. Headeres and parameters are also important in HTTP request as the contain important identifier information as to the request's metadata, authorization, URI, caching, cookies etc.  

Request: request.get_json(), request.headers.get('your header name')    
Response: jsonify(response)  

### Common Hedaers:
1) Authorization: Base64(username:password)
2) WWWW-Authenticate (sent by server)
3) Accept-Charset
4) Content-Type: application/json (response type sent to client by server)
5) Cache-Control


