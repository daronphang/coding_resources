### LDAP (Lightweight-Directory Access Protocol)

LDAP is used for accessing and managing a directory service such as Active Directory (AD). Facilitates the sharing of information on users, systems, networks, services, and applications. Allows individual users and applications to find and verify whatever information they need within their organization. Most common application of LDAP is authenticating users to an AD network i.e. LDAP stores usernames and passwords.

It is not a server, database, authentication procedure, credentials repository and network service; it is a set of rules that must be followed to talk to an external server/database. Data managed via LDAP are key/value pairs grouped in a hierachical structure.

### AD (Active Directory)

AD is Microsoft's proprietary database system that stores and manages domains, user information, credentials, computers, printers and other shared resources across an organizational network. Stores data as objects with unique distinguished name (DN) attribute. Helps organizations to locate objects throughout their digital infrastructure and carefully regulate who has access to what resources.

Without a directory:

- Users are required to provide username and password for each application.
- IT admins would have to manually assign user to every application that needs to be accessed.
- Updating credentials need to be performed across all applications.

### LDAP vs AD

LDAP is an application protocol for querying and editing items in directory service providers like AD, which supports LDAP. Together, LDAP and AD make it possible for clients throughout businesses to access the information they need.

LDAP is the protocol or language that servers use to communicate with AD and similar directory services. LDAP allows you to seearch for someone or something without knowing the location.

Frontend login route sends credentials to API -> API sends data to LDAP/AD
LDAP can be used to create secretive policy i.e. some users have acccess to view certain files.
Structure of LDAP:
ROOT -> Domain Component -> Organization Unit User/Group -> Common Name John

### LDAP-Directory Organization Structure

```
Root (Domain Component)
  Countries
       Organizations
            Organizational Units
                  Individuals

dc      domain component
o       Organization name
ou      Organization unit
cn      Common name
sn      Surname
dn      Distinguish name
User    User object

DN for an entry can be known starting from entry in question and traversing up the tree until hit root
i.e. uid=roger,ou=people,dc=example,dc=com
```
