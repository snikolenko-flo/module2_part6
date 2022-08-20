import { ErrorService } from './error.service.js';

const error = new ErrorService();

export function checkAuthorization(req, res, next) {
  if (!req.headers.authorization) return error.sendAuthError(res);
  if (req.headers.authorization !== 'token') return error.sendWrongTokenError(res);
  next();
}