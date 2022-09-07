import { ErrorService } from './error.service.js';
import { log } from './logger.service.js';
import { Request, Response } from 'express';

const error = new ErrorService();

export function checkAuthorization(req: Request, res: Response, next) {
  log.info('Check if the user is authorized.');
  if (!req.headers.authorization) return error.sendAuthError(res);
  if (req.headers.authorization !== 'token') return error.sendWrongTokenError(res);
  log.info('The user is authorized.');
  next();
}