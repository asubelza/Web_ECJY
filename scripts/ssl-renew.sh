#!/bin/bash
# SSL Certificate Renewal Script
# Runs automatically via certbot

# Renew certificate
sudo certbot renew --quiet

# If renewed, copy to Docker volume and restart nginx
if [ $? -eq 0 ]; then
    sudo cp /etc/letsencrypt/live/estudiocontablejy.com.ar/fullchain.pem /home/estudiocontablejy/Web_ECJY/ssl/cert.pem
    sudo cp /etc/letsencrypt/live/estudiocontablejy.com.ar/privkey.pem /home/estudiocontablejy/Web_ECJY/ssl/key.pem
    docker-compose -f /home/estudiocontablejy/Web_ECJY/docker-compose.yml restart nginx
    echo "SSL certificate renewed and nginx restarted"
else
    echo "SSL certificate renewal failed"
fi