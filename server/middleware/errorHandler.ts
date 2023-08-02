// 封装错误处理中间件
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};

export { errorHandler };
