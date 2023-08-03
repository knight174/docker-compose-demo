// 路由中间件：记录网站访问次数
import { Request, Response, NextFunction } from 'express';
import { redisIncrAsync } from '../db/redisClient';
import { NODE_ENV } from '../config/config';

const visitCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isProd = NODE_ENV === 'production';
    const count = isProd
      ? await redisIncrAsync('visitCount')
      : await redisIncrAsync('visitCount_dev');
    res.locals.visitCount = count;
    next();
  } catch (err) {
    next(err);
  }
};

export { visitCounter };
