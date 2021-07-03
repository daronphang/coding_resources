## Miscellaneous:

## Creating folder:
```
mkdir <folder\to\new_directory_name>
```

## PowerShell:
Powershell is a cross-platform task automation solution made up of command-line shell, scripting language, and a configuration management framework. Much more powerful than CMD. A Shell is a user interface that gives access to various services of OS. Can be installed on Windows, Linux and Mac. Used for task automation and configuration management. Commands are called cmdlets.

CMD is original shell for Microsoft OS. Powershell is new shell that replaces old CMD functionality with new scripting, allowing users to automate complicated tasks with reusable scripts. PowerShell uses cmdlets which are self-contained programming objects that expose the underlying admin options inside of Windows. Used mainly by IT administrators. For example, implementing new security solution dependent on a specific service that has to run on all servers; checking if each server has specific service installed can be tedious, but PowerShell scripting helps to automate this.

## Secure Socket Shell (SSH):
Network protocol that gives users a secure way to access a computer over an unsecured network. Provides strong password authentication and public key authentication, including encrypted data communications between computers connecting over an open network.


## Curl:
Command line tool that allows transfer of data across network. Supports many protocols including HTTP, HTTPS, FTP, FTPS, POP3, etc. Supports on universal OS. 

``` 
curl --verbose https://example.com        Inspect all details of request and response

curl https://example.com                  GET request, returns body of response
curl https://{one,two,three}.com          Send multiple requests
curl -i https://example.com               Show response headers

curl -d "option=value" -X POST https://example.com    Sending URL-encoded data
curl -d '{"option": "value"}' -H "Content-Type: application/json" -X POST https://example.com
curl -d "@my-file.json" -X POST https://example.com

curl -L https://example.com       Follow automatically to redirect response specified in Location response header

curl -o file.html https://example.com             Save response to a file

curl -u user:pass https://example.com             Provide basic auth

curl -b "oraclelicense=a" https://example.com     Sending cookies

curl -x 192.168.1:8888 https://example.com        Using proxies
``` 

## Proxy Server:
Intermediary between networks and user-clients i.e. acts as a gateway. Mostly used to monitor and log all web requests. Provides additional features such as enhanced security (firewall and privacy) and network performance. User sends web request to proxy server's Internet Protocol (IP) Address; proxy server makes request on user's behalf (with changes to request data if needed such as IP address, provding encryption, etc.) and forwards back the response. Can also be used to block certain web pages based on IP address.
