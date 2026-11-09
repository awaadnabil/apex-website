#!/bin/zsh
# Clean production build, then serve it on one port. Kills whatever listens on that port first
# (by port, not by name: Next renames its process to "next-server", so `pkill -f "next start"` misses it).
#   scripts/serve-prod.sh [port]
PORT=${1:-3200}
cd "$(dirname "$0")/.."
for pid in $(lsof -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null); do kill $pid; done
rm -rf .next
pnpm build > /tmp/apex-build.log 2>&1 || { tail -40 /tmp/apex-build.log; exit 1; }
nohup pnpm start -p $PORT > /tmp/apex-serve-$PORT.log 2>&1 &
for i in $(seq 1 40); do curl -s -o /dev/null "http://localhost:$PORT/" && break; sleep 0.5; done
echo "serving production build on :$PORT (pid $(lsof -tiTCP:$PORT -sTCP:LISTEN))"
