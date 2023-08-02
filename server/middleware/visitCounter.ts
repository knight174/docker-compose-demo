// 路由中间件：记录网站访问次数
import { Request, Response, NextFunction } from 'express';
import { redisIncrAsync } from '../db/redisClient';

const visitCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = await redisIncrAsync('visitCount');
    res.locals.visitCount = count;
    next();
  } catch (err) {
    next(err);
  }
};

export { visitCounter };
