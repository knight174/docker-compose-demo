import { Pool, QueryResult, QueryResultRow } from 'pg';
import { seed } from './seed';
import { pgConfig } from '../config/config';

// 创建 PostgreSQL 连接池
const pgPool = new Pool(pgConfig);

// 封装 PostgreSQL 查询方法
export const pgQuery = async <T extends QueryResultRow>(
  queryText: string,
  params: any[] = []
): Promise<QueryResult<T>> => {
  const client = await pgPool.connect();
  try {
    const result = await client.query<T>(queryText, params);
    return result;
  } finally {
    client.release();
  }
};

// 检查 users 表是否存在数据，如果没有则调用种子方法
(async function checkAndSeed() {
  const queryResult = await pgQuery('SELECT COUNT(*) FROM users');
  const rowCount = queryResult.rows[0].count;

  if (rowCount === '0') {
    await seed(pgPool);
  } else {
    console.log('数据表中已存在数据，跳过播种。');
  }
})();
