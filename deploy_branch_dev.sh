echo "PORT=$PORT"
git fetch origin && git reset --hard origin/dev && git clean -f -dev
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d