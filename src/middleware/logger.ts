import { Request, Response, NextFunction } from 'express';

export const logTime = async (_: Request, __: Response, next: NextFunction) => {
  console.log(`Current time ${new Date()}`);
  next();
};
