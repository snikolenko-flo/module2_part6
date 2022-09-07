import { LoginManager } from './login.manager.js';
import { log } from '../services/logger.service.js';
import { Request, Response } from 'express';

const manager = new LoginManager();

export async function login(req: Request, res: Response) {
  const { email, password } = await manager.user.getBody(req);
  const user = manager.user.findUser(email);

  if (!user) return manager.error.sendLoginError(res);
  log.info('The user exists.');

  if (user.password !== password) return manager.error.sendLoginError(res);
  log.info('The user email and password are valid.');

  manager.response.sendToken(req, res);
}
