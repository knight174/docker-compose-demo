import { Pool } from 'pg';
import { faker } from '@faker-js/faker';

interface User {
  name: string;
  email: string;
}

// 生成随机的 seedData
function generateSeedData(count: number): User[] {
  const seedData: User[] = [];

  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();

    seedData.push({ name, email });
  }

  return seedData;
}

const seedData: User[] = generateSeedData(20); // 生成 20 条随机数据

async function seed(pool: Pool): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const data of seedData) {
      const { name, email } = data;
      await client.query('INSERT INTO users (name, email) VALUES ($1, $2)', [
        name,
        email,
      ]);
    }

    await client.query('COMMIT');
    console.log('数据播种成功！');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('播种数据时出错：', error);
  } finally {
    client.release();
  }
}

export { seed };
