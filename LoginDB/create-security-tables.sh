#!/bin/bash

CONTAINER="local-postgres11.5-database"
SCRIPT="create-security-tables.sql"

docker cp $SCRIPT $CONTAINER:$SCRIPT;

docker exec $CONTAINER psql -U postgres -f $SCRIPT;