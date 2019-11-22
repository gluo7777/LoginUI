# Login Server

## Running

### UI

> cd ./LoginUI && npm start

Go to http://frontend.login.com:3000

### Database

#### Initial Set Up

> ./LoginDB/setup.sh

> ./LoginDB/create-tables.sh

#### Start Server

> docker start "local-postgres11.5-database"

#### To run CLI to execute queries

> docker exec -it "local-postgres11.5-database" psql -U postgres -d loginapp

### API

> cd ./LoginServer && mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=local

> curl -v -i -X GET http://backend.login.com:9090/api

## App Interaction

### Using Curl to test with random user-agent

```bash
# Login
curl -v -i -c cookies -H "Host:frontend.login.com:3000" -X POST -F 'username=williamluo7777' -F 'password=abc123' http://backend.login.com:9090/app/login
# Generate CSRF Token
# Authenticated Requests
curl -v -i -b cookies -H "Host:frontend.login.com:3000" -X GET http://backend.login.com:9090/api/users/2
# Logout
```

# Login UI

## Running

> npm start