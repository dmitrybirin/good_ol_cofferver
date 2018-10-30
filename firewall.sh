#!/bin/bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable
sudo ufw allow http
sudo ufw allow https
sudo ufw allow from 167.99.137.12
sudo ufw allow from 84.50.186.76
