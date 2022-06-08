## RDP (Remote Desktop Protocol)

Protocol developed by Microsoft that is used to contorl and manage machines with a Windows OS remotely. Unlike SSH, connections established using an RDP client provide a user with a GUI. Default port is 3389. 

## Enabling RDP Connection

Requires you to enable Windows Remote Desktop server service. When connecting to a server over the internet and not through local network, need to take certain things into consideration.

### Port Forwarding

If you are not using VPN, need to make sure ports are forwarded properly to the remote host's IP. Windows server in this case is directly exposed to the internet and vulnerable.

### Using a VPN

Much safer option for RDC. When you create a virtual private network on a client computer, you will be able to access all services that are available only when you use local connection.

### Firewall Settings

Make sure that the firewall you are using for the remote machine is not blocking RDC. 

