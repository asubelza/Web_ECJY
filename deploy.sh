#!/bin/bash

# Estudio Contable JY - Deploy Script for VPS
# Usage: ./deploy.sh

set -e

echo "🚀 Deploying Estudio Contable JY..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker not found. Installing Docker...${NC}"
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo -e "${GREEN}Docker installed. Please logout and login again, then run this script.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${YELLOW}Docker Compose not found. Installing...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Set docker compose command
DOCKER_COMPOSE="docker-compose"
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please edit .env with your actual configuration!${NC}"
fi

# Pull latest code if git is available
if [ -d .git ]; then
    echo -e "${GREEN}Pulling latest code...${NC}"
    git pull origin main || echo "Git pull skipped"
fi

# Update git submodules
if [ -f .gitmodules ]; then
    echo -e "${GREEN}Updating submodules...${NC}"
    git submodule update --init --recursive
fi

# Build and start containers
echo -e "${GREEN}Building and starting containers...${NC}"
$DOCKER_COMPOSE down
$DOCKER_COMPOSE up -d --build

# Wait for services to be healthy
echo -e "${GREEN}Waiting for services to start...${NC}"
sleep 10

# Show status
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deploy completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Services:"
echo "  - Frontend:       http://localhost:3000"
echo "  - Backend API:    http://localhost:5000"
echo "  - Cruce Tool:     http://localhost:3001"
echo "  - Mongo Express:  http://localhost:8081"
echo ""
echo "To view logs: $DOCKER_COMPOSE logs -f"
echo "To stop: $DOCKER_COMPOSE down"
