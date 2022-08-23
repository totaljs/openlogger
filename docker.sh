echo "BUILDING"
docker-compose build

echo "TAGGING"
docker tag openlogger_web totalplatform/openlogger:latest

echo "PUSHING"
docker push totalplatform/openlogger:latest

echo "DONE"