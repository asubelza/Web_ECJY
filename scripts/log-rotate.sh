#!/bin/bash
# Log rotation for Docker containers

# Rotate logs older than 7 days
find /var/lib/docker/containers/ -name "*.log" -mtime +7 -exec truncate -s 0 {} \;

# Restart containers to apply
docker-compose -f /home/estudiocontablejy/Web_ECJY/docker-compose.yml restart

echo "Logs rotated successfully"