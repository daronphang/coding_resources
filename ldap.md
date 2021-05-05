## LDAP:
Lightweight-Directory Access Protocol used for accessing and managing a directory service such as Active Directory (AD). Facilitates the sharing
of information on users, systems, networks, services, and applications. Allows individual users and applications to find and verify whatever information
they need within their organization. Most common application of LDAP is authenticating users to an AD network i.e. LDAP
stores usernames and passwords.

## AD:
AD is Microsoft's proprietary database system that stores and manages domains, user information, and other shared resources across an organizational network.
Helps organizations to locate objects throughout their digital infrastructure and carefully regulate who has access to what resources.

### LDAP vs AD:
LDAP is an application protocol for querying and editing items in directory service providers like AD, which supports LDAP.
Together, LDAP and AD make it possible for clients throughout businesses to access the information they need.



database system that provides authentication, directory control, policy, and other services in a Windows server enivronment. AD comprises of services
that allow users to access and manipulate those resources. Stores data as objects. 

LDAP is the protocol or language that servers use to communicate with AD and similar directory services. 

Protocol that is used to communicate with AD (Directory Service Database).
Directory tells you where an object is located i.e. individuals, resources.
LDAP allows you to seearch for someone or something without knowing the location. 
Frontend login route sends credentials to API -> API sends data to LDAP/AD
LDAP can be used to create secretive policy i.e. some users have acccess to view certain files.
Structure of LDAP:
ROOT -> Domain Component -> Organization Unit User/Group -> Common Name John



### Organization Structure:
```
o       Organization name
ou      Organization unit
cn      Common name
sn      Surname
dn      Distinguish name
User    User object
