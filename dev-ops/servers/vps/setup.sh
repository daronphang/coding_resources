# !bin/bash

# shell script for vps setup with the following configurations:
# 1. Add new user with sudo privileges
# 2. Disabling root 
# 3. Configuring firewall, datetime
# 4. Installing key packages

# script is to be run in sudo 

addNewUser() {	
       	echo adding new user...
   	read -p "Enter username with sudo privileges: " username
    	adduser "$username"
    	usermod -aG sudo "$username"

    	if groups "$username" | grep -w -q "sudo"
    	then 
    	echo "$username" added with sudo privileges...
    	else 
    	echo unable to grant sudo to "$username", exiting...
    	exit 1
    	fi
}	

configureSSH(){
	# disable root and other config if needed 
	read -p "configuring sshd_config, press any key to continue..." 
	echo $PATH
	vi /etc/ssh/sshd_config
	echo restarting sshd...
	systemctl restart sshd
}

configureHost(){
	echo "configuring host, press any key to continue..."
	vi /etc/hosts
	echo configured host done...
}

configureFirewall(){
	echo "check if IPV6 set to yes, press any key to continue..."
	vi /etc/default/ufw
	echo setting up defaults...
	ufw allow ssh
	ufw allow 22/tcp
	ufw limit 80/tcp
	ufw allow 443/tcp
	ufw allow www
	ufw allow ftp
	ufw allow 21/tcp
	ufw allow 20/tcp
	echo restarting firewall after config...
	ufw disable
	ufw enable
	echo ufw configuration done...
}

setTimezone(){
	echo setting timezone to SG...
	timedatectl set-timezone 'Asia/Singapore'
	echo date
}

installAndUpdatePackages(){
	echo updating system for ubuntu...
	apt update && apt upgrade -y
	echo installing python tools, venv and pip...
	apt update && apt install -y build-essential libssl-dev libffi-dev python3-dev python3-pip python3-venv
	echo installing nodejs and npm...
	apt update && apt install -y nodejs npm

	echo installing curl, supervisor, nginx, vim, gunicorn...
	apt update && apt install -y curl supervisor nginx vim gunicorn
}

# main body of script
echo starting shell script...
setTimezone
installAndUpdatePackages
addNewUser
disableRoot
echo script ended...
