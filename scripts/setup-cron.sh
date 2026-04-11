#!/bin/bash
# Setup cron jobs for automated scripts

# Add to crontab
(crontab -l 2>/dev/null | grep -v "scripts/"; cat <<EOF
# MongoDB backup - daily at 2am
0 2 * * * /home/estudiocontablejy/Web_ECJY/scripts/backup-mongo.sh >> /var/log/mongo-backup.log 2>&1

# Log rotation - daily at 3am
0 3 * * * /home/estudiocontablejy/Web_ECJY/scripts/log-rotate.sh >> /var/log/log-rotate.log 2>&1

# SSL renewal check - twice daily
0 */12 * * * /home/estudiocontablejy/Web_ECJY/scripts/ssl-renew.sh >> /var/log/ssl-renew.log 2>&1
EOF
) | crontab -

echo "Cron jobs configured successfully"