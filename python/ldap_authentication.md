## LDAP Protocol:
1) Attribute names and string values must be stored in unicode with UTF-8 byte encoding as interaction with LDAP server is in bytes.
2) Attribute names must use only ASCII letters, numbers and hypen character.

## LDAP Protocol Sequence:
1) Client opens connection
2) Client authenticates (bind)
3) Client sends operations (search)
4) Server sends results
5) Client unbinds and closes connection

### Bind:
Authentication operation that can be performed in three ways:
```
Anonymous Bind          Public access to LDAP server where no credentials are provided
Simple Password Bind    Provide Distinguished Name (DN) and password to determine authorization level
SASL                    Provides additional methods to identify a user i.e. external certificate, Kerberos ticket
```
### Client Strategy:
Parameter of Connection object.
```
# Synchronous, returns boolean if successful
SYNC            
RESTARTABLE

# Asynchronous, returns a number and message_id of request. Can send multiple requests without waiting for responses
ASYNC
REUSABLE

get_response(message_id, timeout)   # Exception raised if response has not arrived after timeout (default is 10s)
```
```python
import ldap

def check_credentials(username, password):
    LDAP_SERVER = 'ldap://our-ldap.server'
    LDAP_USERNAME = username
    LDAP_PASSWORD = password
    base_dn = 'dc=somedomain,dc=com'                            # domain  
    ldap_filter = 'userPrincipalName=user@somedomain.com'
    ldap_attr = ['memberOf'] or ['*']                           # attributes to receive 
    
    try:
        conn = ldap.initialize(LDAP_SERVER)
        conn.set_option(ldap.OPT_REFERRALS, 0)    # perform sychronous bind
        conn.simple_bind_s(LDAP_USERNAME, LDAP_PASSWORD)  # _s means request will be executed sychronously
    except ldap.INVALID_CREDENTIALS:
        conn.unbind()
        return 'Wrong username or password'
    except ldap.SERVER_DOWN:
        return 'AD server not available'
  
    result = connect.search_s(base_dn,                     
                          ldap.SCOPE_SUBTREE,   # search object and all its descendants    
                          ldap_filter,      
                          ldap_attr)           
    conn.unbind()
                         
# result is a tuple
# [(‘CN=user,OU=user_orgunit,OU=Users,OU=City,DC=somedomain,DC=com’, {‘memberOf’: [‘group1’, ‘group2’]})]
```
```python
import ldap3
from ldap3 import Server, Connection, ALL, NTLM

def ldap_auth(username: str, password: str):
    LDAP_SERVER = 'ldap://ldap.testing.com'
    LDAP_USERNAME = username
    LDAP_PASSWORD = password
    ldap_base_dn = 'dc=somedomain,dc=com'   # or 'ou=mtworkers,o=test.com' 
    ldap_search_filter = '(&(objectclass=person)(uid=admin))'
    ldap_attributes = ['sn','krbLastPwdChange', 'objectclass']
    
    try:
        server = Server(LDAP_SERVER, get_info=ALL)
        conn = Connection(server, user=LDAP_USERNAME, password=LDAP_PASSWORD)
    except ldap3.core.exceptions:
        ldap_msg = {
            'message': 'failed',
            'error': conn.last_error
        }
    else:
        conn.bind()
        # Retrieve hierarchy structure of user
        conn.search(search_base=ldap_base_dn,
                    search_filter=ldap_search_filter,
                    attributes=ldap_attributes)
                    
        output = conn.response          # output is type <class 'list'
        # if username/password is wrong, returns an empty list []
        
        # checking credentials
        if len(output) > 0:
            response = output[0]    # response is of type dict
            ldap_msg = {
                'message': 'success',
                'uid': response['raw_attributes']['uid'][0].decode('utf-8'),
                'dept': response['raw_attributes']['businessCategory'][0].decode('utf-8')
            }
        else:
             ldap_msg = {
                'message': 'Login failed. Username or password is incorrect',
                'status': 401
             }
      
    finally:
        conn.unbind()
        return ldap_msg
  
# conn = Connection(server, 'uid=admin,cn=users,cn=accounts,dc=demo1,dc=freeipa,dc=org', 'Secret123', auto_bind=True)

>>> print(conn)
# ldap://ipa.demo1.freeipa.org:389 - cleartext - user: None - bound - open - <local: 192.168.1.101:49813 - remote: 209.132.178.99:389> -
# tls not started - listening - SyncStrategy - internal decoder

server.schema     # prints all information about server

# Mandatory search_filter example:
# &, |, !
# Search all users named John or Fred with an email ending with @example.org
(&                        # AND assertion
    (|                    # OR assertion
        (givenName=Fred)
        (givenName=John)
    )
    (mail=*@example.org)
)
```
### Connection object attributes:
```
result          Result of last operation returned by server
response        Entries found if last operation is Search
entries         Entries found exposed by ldap3 Abstraction layer if last operation is Search
last_error      Error if occured in operation
bound           True if connection is bound to server
listening       True if socket is listening to server
closed          True if socket is not open
```
