# Use Docker to persist data in a Postgressql DB
## https://medium.com/@rrfd/setting-up-docker-postgresql-connecting-locally-using-advanced-functions-d8fe3bd58de6

# Variables
## https://hub.docker.com/_/postgres/
PSQL_IMAGE="postgres:11.5-alpine"
PSQL_CONTAINER="postgres11.5-database"
PSQL_CONTAINER_LOCAL="local-$PSQL_CONTAINER"
PSQL_DIR="/var/lib/postgresql/data"

# Pull Image
## Alpine is smaller in size ~ 5mb
docker images -a
docker pull $PSQL_IMAGE

# Create Container
docker create -v $PSQL_DIR --name $PSQL_CONTAINER $PSQL_IMAGE
docker container ls -a | grep "$PSQL_CONTAINER"

# Configure Database
## Mount volume from container
docker run --name "$PSQL_CONTAINER_LOCAL" -p 5432:5432 -e POSTGRES_PASSWORD=password -d --volumes-from $PSQL_CONTAINER $PSQL_IMAGE

# Launch psql within running container
docker exec -it "$PSQL_CONTAINER_LOCAL" psql -U postgres

# Restart for quick test
docker stop $PSQL_CONTAINER_LOCAL
docker rm -v $PSQL_CONTAINER_LOCAL