## ufw (Uncomplicated Firewall)

Provides a much more user-friendly framework for managing netfilter and a cli/GUI for working with the firewall. Provides a frontend to iptables (complicated).

**If you are running Docker, by default Docker directly manipulates iptables. Any UFW rules that you specify do not apply to Docker containers**.

### Using IPv6

If your VPS (Virtual Private Server) is configured for IPv6, ensure that UFW is configured to support IPv6 so that it configures both IPv4 and IPV6 firewall rules.

Ensure IPV6 is set to 'yes'.

```console
$ sudo vi /etc/default/ufw
$ sudo ufw disable      # restart firewall after configuration
$ sudo ufw enable
```

### Arguments

```
allow
deny
reject
limit           Blocks connection after six attempts in 30-second period
status          Displays if the firewall is active or inactive
show            Displays the current running rules on your firewall
reset           Disables and resets the firewall to default
reload          Reloads the current running firewall
disable         Disables the firewall
```

```console
$ ufw [--dry run] [options] [rule syntax]   # dry run informs not to make any changes

$ sudo ufw allow 22
$ sudo ufw deny 22          # deny port 22
$ sudo ufw deny 22/tcp
$ sudo ufw allow ssh
$ sudo ufw limit 80/tcp     # prevent DDOS
$ sudo ufw allow out on eth0 to any port 25 proto tcp
```

### Checking Rules

```console
$ sudo ufw status

$ sudo ufw logging on
```

### Setting Up Defaults

UFW's default is to deny all incoming connections and allow all outgoing connections.

```console
$ sudo ufw default deny incoming
$ sudo ufw default allow outgoing
```

### Allowing Connections

```console
$ sudo ufw allow ssh
$ sudo ufw allow 22/tcp     # ssh
$ sudo ufw allow 80/tcp     # http
$ sudo ufw allow 443/tcp    # https
$ sudo ufw allow www

# file transfer protocol
$ sudo ufw allow ftp
$ sudo ufw allow 21/tcp
$ sudo ufw allow 20/tcp

$ sudo ufw allow 1000:2000/tcp          # port ranges
$ sudo ufw allow from your_server_ip
```

### Deleting Rules

```console
$ sudo ufw delete allow 80/tcp

$ sudo ufw status numbered
$ sudo ufw delete number
```
