#!/bin/bash
# MongoDB Backup Script
# Runs daily via cron

BACKUP_DIR="/home/estudiocontablejy/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Backup MongoDB
docker exec estudio_jy_mongodb mongodump --archive=$BACKUP_DIR/mongo_$DATE.archive --gzip

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs -r rm

echo "MongoDB backup completed: mongo_$DATE.archive"