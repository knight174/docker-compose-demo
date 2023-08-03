import dotenv from 'dotenv';
dotenv.config();
const {
  NODE_ENV,
  PORT,
  PSQL_DB,
  PSQL_USER,
  PSQL_PASS,
  PSQL_HOST,
  PSQL_PORT,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
} = process.env;

// postgres 配置
const pgConfig = {
  user: PSQL_USER,
  password: PSQL_PASS,
  host: NODE_ENV === 'production' ? PSQL_HOST : 'localhost',
  port: NODE_ENV === 'production' ? Number(PSQL_PORT) : 5432,
  database: PSQL_DB,
};

// redis 配置
const redisConfig = {
  host: NODE_ENV === 'production' ? REDIS_HOST : 'localhost',
  port: NODE_ENV === 'production' ? Number(REDIS_PORT) : 6379,
  password: REDIS_PASS,
};

export { NODE_ENV, PORT, pgConfig, redisConfig };
