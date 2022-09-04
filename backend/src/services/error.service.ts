import { log } from './logger.service.js';

export class ErrorService {
  sendAuthError(res) {
    log.error('The user is not authorized.');
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'Auth token should be provided for authorization' }));
  }

  sendWrongTokenError(res) {
    log.error('The auth token is not valid');
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'The auth token is not valid' }));
  }
}
