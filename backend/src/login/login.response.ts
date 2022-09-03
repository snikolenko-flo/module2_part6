import { log } from '../logger.js';

export class LoginResponse {
  sendToken(req, res) {
    req.on('end', () => {
      res.statusCode = 200;
      res.end(JSON.stringify({ token: 'token' }));
      log.info('Auth token was sent to the frontend.');
    });
  }
}
