import { LoginManager } from './login.manager.js';
import { log } from '../logger.js';

const manager = new LoginManager();

export async function login(req, res) {
  const { email, password } = await manager.user.getBody(req);
  const user = manager.user.findUser(email);

  if (!user) return manager.error.sendLoginError(res);
  if (user.password !== password) return manager.error.sendLoginError(res);

  manager.response.sendToken(req, res);
  log.info('User is logged in.');
}
