## Linux:
- Linux is an open-source OS using UNIX core which sites underneath of all other software on a computer.
- OS is a software that manages connection between software and hardware resources associated with desktop i.e. car engine.
- User has access to alter source code of kernel and code unlike Windows.
- Files are stored in tree structure starting with root directory.
- Used in smartphones (android), cars, home appliances, servers (most used), etc. 
- Reliable and secure as it is easy to detect bugs and fix.

### Useful Linux Commands:
```
sudo                        Superuser do
su <user>                   ctrl+D to logout of su
sudo apt update             Updates packages but does not install them
sudo apt upgrade

ifconfig                    Show network interface such as IP address
curl ifconfig.me
ip address show
whoami
speedtest.cli               Network test


conda activate
conda install
df

vi
ls -la 
ps -ax | grep nginx

ubuntu-drivers devices
```

## Linux OS:
1) Bootloader: Software that manages boot process.
2) Kernel: Core of OS system and manages CPU, memory and peripheral devices.
3) Init System: Sub-system that bootstraps user space and is charged with controlling daemons.
4) Daemons: Background services that start up during boot or after logging in.
5) Graphical Server: Sub-system that displays graphics on monitor.
6) Desktop Environment: For users to interact with.
7) Applications

## Distributions:
Different versions to suit different users. Examples include Linux Mint, Ubuntu, Debian, Antergos, Solus, etc. For servers, exammples include Red Hat, Ubuntu, CentOS, SUSE Enterprise.

Both Debian and Ubuntu use APT package management system and DEB packages for manual installation. Desktop environment is GNOME.

## Bash vs Terminal:
Shell is a program that exposes OS' services to human users or other programs through CLI or GUI. Bash is both a shell and scripting language used to interact with OS (similar to PowerShell). Comes with SSH command by default. Terminal is an emulator window that runs shell by default i.e. terminal sends user input to shell program which will then generate output and passes back to terminal. Can run bash inside a terminal i.e. shell running another. Examples of Shell include bash, fish, zsh, PowerShell, cmd, pwsh, etc.

## Remote Computing:
MobaXterm provides toolbox for remote computing (SSH, X11, RDP, VNC, FTP, MOSH) and Unix commands on Windows.
