import { User } from '../interfaces/user.js';
import { users } from '../users/users.js';
import { Request } from 'express';

export class LoginUser {
  async getBody(req: Request): Promise<User> {
    let body = '';
    await req.on('data', (chunk) => {
      body += chunk.toString();
    });
    return JSON.parse(body);
  }

  findUser(email: string) {
    return users.find((user) => user.email == email);
  }
}
