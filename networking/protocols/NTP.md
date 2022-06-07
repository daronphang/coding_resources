## NTP (Network Time Protocol)

An OS daemon which sets and maintains the system time of day in synchronism with internet standard time servers.

### Choices

Chrony and ntpd (original NTP daemon). Chrony makes it the better choice for most environments:

-   Can synchronize to the time server much faster than NTP.
-   Can compensate for fluctuating clock frequencies.
-   Handles intermittent network connections and bandwidth saturation.
-   Adjusts for network delays and latency.

### Installation

```console
$ sudo apt install chrony

$ systemctl status chronyd
```
