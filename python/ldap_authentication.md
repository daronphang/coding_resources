## LDAP Protocol:
1) Attribute names and string values must be stored in unicode with UTF-8 byte encoding as interaction with LDAP server is in bytes.
2) Attribute names must use only ASCII letters, numbers and hypen character.
3) 

```
import ldap3

conn = ldap.initialize('ldap://our-ldap.server')
conn.protocol_version = 3
conn.set_option(ldap.OPT_REFERRALS, 0)


```
