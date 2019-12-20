#!/bin/bash

CONTAINER="local-postgres11.5-database"
SQL="populate-tables.sql"
DATA="data"

docker exec $CONTAINER rm -rf $DATA;
docker cp $DATA $CONTAINER:$DATA;
docker cp $SQL $CONTAINER:$SQL;
docker exec $CONTAINER ls -al ./ $DATA;
docker exec $CONTAINER psql -U postgres -f $SQL;