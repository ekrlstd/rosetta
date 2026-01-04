#!/bin/bash
set -e

# Configuration
SERVER_IP="46.62.204.165"
SERVER_USER="root"
SERVER_PASS="AtjEaxM3sRqq"
REMOTE_DIR="/root/rosetta"
SKYVIEW_API_KEY="sk_live_rosetta_12345"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Starting deployment to $SERVER_IP...${NC}"

# Function to run command with expect
run_with_expect() {
    local cmd="$1"
    expect -c "
        set timeout 300
        spawn $cmd
        expect {
            \"*?assword:*\" {
                send \"$SERVER_PASS\r\"
                exp_continue
            }
            \"yes/no\" {
                send \"yes\r\"
                exp_continue
            }
            eof
        }
    "
}

# 1. Sync Files using rsync (wrapped in expect)
echo -e "${YELLOW}📦 Syncing files...${NC}"
run_with_expect "rsync -avz --exclude 'node_modules' --exclude '__pycache__' --exclude '.git' --exclude '.env' --exclude 'dist' ./ $SERVER_USER@$SERVER_IP:$REMOTE_DIR/"

# 2. Rebuild and Restart Services using ssh (wrapped in expect)
# NOTE: Changed 'docker-compose' to 'docker compose' for V2 support
echo -e "${YELLOW}🔄 Rebuilding and restarting containers...${NC}"
REMOTE_CMD="cd $REMOTE_DIR && \
    export SKYVIEW_API_KEY=$SKYVIEW_API_KEY && \
    docker compose down || docker-compose down; \
    docker compose up -d --build || docker-compose up -d --build && \
    docker compose ps || docker-compose ps"

run_with_expect "ssh $SERVER_USER@$SERVER_IP \"$REMOTE_CMD\""

echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo -e "${GREEN}🌍 API: http://$SERVER_IP:8000${NC}"
echo -e "${GREEN}📱 Frontend: http://$SERVER_IP${NC}"
