# Login Server

## Running

### Front End

> cd ./LoginUI && npm start

Go to http://frontend.login.com:3000

### Back End

#### General

```bash
# Build artifacts
mvn -f LogServer/pom.xml clean package
# Use docker-compose to build images, create containers, and run as services
docker-compose up --rebuild
```
#### Database

```bash
cd LoginDB
docker build -t postgres:v0 .
docker run --rm -d --name lone_postgres -v lone_postgres:/var/lib/postgresql/data -p 5432:5432 postgres:v0
```

#### API

> mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=standalone

## Testing

### Configure Hosts

1. Run Powershell as admin
2. .\notepad.exe c:\windows\system32\drivers\etc\hosts
3. Add the following lines:
```
127.0.0.1 frontend.login.com
127.0.0.1 backend.login.com
```

### Using Curl to test with random user-agent

```bash
# Login
curl -v -i -c cookies -H "Host:http://frontend.login.com:3000" -X POST -F 'username=admin1' -F 'password=admin1' http://localhost/app/login
# Generate CSRF Token
# Authenticated Requests
curl -v -i -b cookies -H "Host:http://frontend.login.com:3000" -X GET http://localhost/api/users/2
# Logout
```