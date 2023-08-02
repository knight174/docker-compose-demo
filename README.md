# docker compose demo

## enter into server folder

```bash
cd server
```

## install

```bash
npm i
```

## start

```bash
npm run build
npm run dev
```

## build an express app image

- image name: express-app
- tag: latest

```bash
docker build -t express-app .
```

## create a network

The network name is 'network1'.

```bash
docker network create network1
```

## start an express app

```bash
docker run -d --name my-express-app --network=network1 -p 3000:3000 express-app
```

## start a psotgres server

```bash
docker run -d --name my-postgres -v "$PWD/db-data":/var/lib/postgresql/data --network=network1 -p 5432:5432 -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword postgres:14-alpine
```

### create database and connect

首次创建

```bash
docker exec -it my-postgres bash
psql -U myuser
CREATE DATABASE dev;
\c dev;
```

非首次创建

```bash
docker exec -it my-postgres bash
psql -U myuser -d dev
```

### create table

创建一个 users 表

```bash
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  deleted BOOLEAN DEFAULT false
);
```

## start a redis server

```bash
docker run -d --name my-redis -v "$PWD/redis-data":/data --network=network1 -p 6379:6379 redis:6.0.20-alpine redis-server --appendonly yes --requirepass 12345678
```
