import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { visitCounter } from './middleware/visitCounter';
import { PORT } from './config/config';
import { pgQuery } from './db/pgClient';
import { faker } from '@faker-js/faker';

const app: Express = express();
const port = PORT;

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// API：查看访问数据
app.get(
  '/api/visit-count',
  visitCounter,
  async (req: Request, res: Response, next: NextFunction) => {
    const visitCount = res.locals.visitCount;
    res.json(visitCount);
  }
);

// API：获取用户列表
app.get(
  '/api/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rows } = await pgQuery(
        'SELECT * FROM users WHERE deleted = false LIMIT 30'
      );
      res.json(rows);
    } catch (err) {
      next(err);
    }
  }
);

// API：创建新用户
app.post(
  '/api/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rows } = await pgQuery('SELECT COUNT(*) FROM users');
      const userCount = parseInt(rows[0].count, 10);
      if (userCount >= 50) {
        return res.status(400).json({ error: 'Maximum user count reached' });
      }

      const name = faker.person.fullName();
      const email = faker.internet.email();
      await pgQuery('INSERT INTO users (name, email) VALUES ($1, $2)', [
        name,
        email,
      ]);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

// API：获取指定用户
app.get(
  '/api/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { rows } = await pgQuery('SELECT * FROM users WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

// API：更新指定用户
app.put(
  '/api/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      console.log(name);

      const { rows } = await pgQuery('SELECT * FROM users WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      await pgQuery('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id,
      ]);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

// API：软删除指定用户
app.delete(
  '/api/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { rows } = await pgQuery('SELECT * FROM users WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      await pgQuery('UPDATE users SET deleted = true WHERE id = $1', [id]);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

// 错误处理中间件
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
