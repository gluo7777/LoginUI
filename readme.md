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
# Generate CSRF Token
# Logout
```

# Login UI

## Running

> npm start