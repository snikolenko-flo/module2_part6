import { users } from '../users/users.js';
import { User } from '../interfaces/user.js';

export class LoginManager {
  async getBody(req): Promise<User> {
    let body = '';
    await req.on('data', (chunk) => {
      body += chunk.toString();
    });
    return JSON.parse(body);
  }

  findUser(email: string) {
    return users.find((user) => user.email == email);
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
