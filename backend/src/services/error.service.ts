import { log } from '../helper/logger.js';
import { Response } from 'express';

export class ErrorService {
  sendAuthError(res: Response) {
    log.error('The user is not authorized.');
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'Auth token should be provided for authorization' }));
  }

  sendWrongTokenError(res: Response) {
    log.error('The auth token is not valid');
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'The auth token is not valid' }));
  }
}