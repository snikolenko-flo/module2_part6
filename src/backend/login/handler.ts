import { LoginManager } from './login.manager.js';

const manager = new LoginManager();

export async function login(req, res) {
  const { email, password } = await manager.getBody(req);
  const user = manager.findUser(email);

  if (!user) return manager.sendLoginError(res);
  if (user.password !== password) return manager.sendLoginError(res);

  manager.sendToken(req, res);
}
