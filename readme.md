# Login Server

## Running

> mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=local

## Consuming

### API Endpoints

> curl -i -X GET http://localhost:9090/api

## App Interaction

### Using Curl to test with random user-agent

```bash
# Login
curl -i -c cookies -H "Host:frontend.login.com:3000" -X POST -F 'username=williamluo7777' -F 'password=abc123' http://localhost:9090/app/login
# Generate CSRF Token
# Authenticated Requests
curl -i -b cookies -H "Host:frontend.login.com:3000" -X GET http://localhost:9090/api/users/2
# Logout
```

# Login UI

## Running

> npm start