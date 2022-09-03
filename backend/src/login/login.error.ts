import { log } from '../logger.js';

export class LoginError {
  sendLoginError(res) {
    log.error('Email or password are invalid.');
    res.statusCode = 401;
    res.end(JSON.stringify({ errorMessage: 'Email or password are invalid.' }));
  }
}
