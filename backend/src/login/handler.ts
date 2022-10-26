import { LoginManager } from './login.manager.js';
import { log } from '../helper/logger.js';
import { Request, Response } from 'express';

const manager = new LoginManager();

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = await manager.user.getBody(req);
    const user = await manager.user.findUser(email);

    if (!user) return manager.error.sendLoginError(res);
    log.info('The user exists.');

    if (user.password !== password) return manager.error.sendLoginError(res);
    log.info('The user email and password are valid.');

    manager.response.sendToken(res);
  } catch (e) {
    log.error(`${e} | function: login.`);
  }
}
