#!/bin/bash

CONTAINER="local-postgres11.5-database"

exec_script "create-security-tables.sql"
exec_script "create-profile-tables.sql"

exec_script(){
    docker cp $1 $CONTAINER:$1;
    docker exec $CONTAINER psql -U postgres -f $1;
}