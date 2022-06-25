import { LoginManager } from './login.manager.js';

const manager = new LoginManager();

export async function login(req, res) {
  const body = await manager.getBody(req);
  const user = await manager.findUser(body.email);

  if (!user) return manager.sendLoginError(res);
  if (user.password !== body.password) return manager.sendLoginError(res);

  manager.sendToken(req, res);
}
