## Overview

LoginApp demonstrates the deployment of a full stack application via container orchestration (docker compose or kubernetes)

## Stack

- Single Page App (React, React Router, Material UI)
- Authorization Server and API (Spring Boot, Spring Security)
- Storage (Postgres)
- Caching and Session Management (Redis)
- Reverse Proxy and Load Balancer (Nginx)

## Running (Locally)

1. Add `127.0.0.1 loginapp.com` to hosts file

2. Run `docker-compose up --build`

## Deployment