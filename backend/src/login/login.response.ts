import { log } from '../helper/logger.js';
import { Request, Response } from 'express';

export class LoginResponse {
  sendToken(req: Request, res: Response) {
    req.on('end', () => {
      res.statusCode = 200;
      res.end(JSON.stringify({ token: 'token' }));
      log.info('Auth token was sent to the frontend.');
    });
  }
}
