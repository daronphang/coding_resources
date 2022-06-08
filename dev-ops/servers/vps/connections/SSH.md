## SSH (Secure Socket Shell)

Protocol which allows you to connect securely to a remote Linux computer or server by using a text-based interface. When a secure SSH connection is established, a shell session will be started, and you will be able to manipulate the server by typing commands within the client on your local computer.

Two most commonly used protocols for accessing remote machines are:
- SSH for linux-based.
- Remote Desktop Protocol (RDP) for Windows.

## How SSH Works

Establishing an SSH connection requires two components:
- Client: An application you install on the computer which you will use to connect to another server.
- Server: SSH daemon that is constantly listening to a specific TCP/IP port for possible client connection requests.

Need to ensure both client and server components are installed on local and remote machine. OpenSSH is a widely-used open-source SSH tool for Linux distro. For Windows, can install PuTTY. Most linux distro already have SSH client installed (except for Ubuntu).

## Installation

### Installing OpenSSH Client

For Windows, need to install a version of OpenSSH such as MobaXTerm. To have a full Linux environment available, can setup WSL which has SSH by default.

```console
$ ssh   # check for ssh client
$ sudo apt-get install openssh-client
```

### Installing OpenSSH Server

On most Linux environments, the ssh server 'sshd' should start automatically.

```console
$ sudo systemctl start ssh      # for ubuntu distro, to manually start ssh

$ ssh localhost 
$ sudo apt-get install openssh-server ii.
$ sudo service ssh status       # check if SSH server is running
```

### Configuring SSH

Config file is located at '/etc/ssh/sshd_config' whereby you can change the settings i.e. port number. Can use any editor of your choice i.e. Nano, Vim. 

```config
Port 22

HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_dsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key

SyslogFacility AUTH
LogLevel INFO

LoginGraceTime 120          # keep connection alive without successfully logging in
PermitRootLogin yes         # tells whether root user is allowed to login
StrictModes yes             # disable login attempt if auth files are readable by everyone

X11Forwarding yes           # allows you to view a remote system's GUI on the local system
X11DisplayOffset 10

PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

```console
$ sudo service ssh restart         # need to restart everytime a change is made
$ sudo systemctl reload ssh        # alternative for restart
```

### Connecting via SSH

```console
$ ssh your_username@host_ip_address
$ ssh your_username@host_ip_address -p 8080
$ ssh our_username@host_ip_address command_to_run
$ ssh -X remote_host        # X11 forwarding
$ exit
```

## Security Hardening

- Change default TCP port from 22 to higher i.e. 24596.
- Use SSH key pairs for authentication for passwordless SSH login.
- Disable password-based logins on your server (need ensure key pair is working properly).
- Disable root access to your server.
- Use TCP wrappers to restrict access to certain IP addresses by editing '/etc/hosts.allow' and '/etc/hosts.deny' files.

For TCP wrappers, allowed hosts supersede denied hosts.

```
# etc/hosts.deny
sshd: ALL
ALL: ALL

# etc/hosts.allow
sshd: 10.10.0.5, LOCAL
```

## SSH Keys

Requires private and public key. **Both should be generated on the client computer**. Server will use public key to create a message for the client computer that can only be read with the private key. Client sends the appropriate response back to the server and the server will know the client is legitimate.

Private key is located on the client machine and is secured and kept secret. Public key can be given to anyone or placed on any server you wish to access.

Though you may be prompted to set a password on the key files themselves, it is an uncommon practice i.e. accepting defaults is sufficient. 

```console
# keys are created at ~/.ssh/id_rsa.pub and ~/.ssh/id_rsa
$ ssh-keygen -t rsa
$ cd ~/.ssh
$ ls -l
```

### Transfering Public Key to Server

```console
$ ssh-copy-id remote_host
```