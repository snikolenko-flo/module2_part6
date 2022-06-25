import { users } from '../../data/users.js';

export class LoginManager {
  async getBody(req) {
    let body = '';
    await req.on('data', (chunk) => {
      body += chunk.toString();
    });
    return JSON.parse(body);
  }

  async findUser(user) {
    const isUser = await users.find((item) => item.email == user);
    return isUser;
  }

  sendToken(req, res) {
    req.on('end', () => {
      res.statusCode = 200;
      res.end(JSON.stringify({ token: 'token' }));
    });
  }

  sendLoginError(res) {
    res.statusCode = 401;
    res.end(JSON.stringify({ errorMessage: 'Email or password are invalid.' }));
  }
}
