docker system prune -f &&
APP_ENV=DEV \
SERVICE_URL=http://localhost:4242 \
SERVICE_PORT=4242 \
DB_HOST=bulb-db \
DB_PORT=27019 \
DB_USERNAME=admin \
DB_PASSWORD=123456 \
DB_NAME=bulb-db \
MANAGE_USERNAME=admin \
MANAGE_PASSWORD=123456 \
SC_RUN_INTERVAL_DAYS=1 \
SC_DELETE_THRESHOLD_DAYS=1 \
docker-compose -p bulb-api-DEV up --build -d
