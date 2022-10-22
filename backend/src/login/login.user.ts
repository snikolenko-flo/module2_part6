import { User } from '../interfaces/user.js';
import { Request } from 'express';
import { DbService } from '../services/db-service.js';

const dbService = new DbService();

export class LoginUser {
  async getBody(req: Request): Promise<User> {
    let body = '';
    await req.on('data', (chunk) => {
      body += chunk.toString();
    });
    return JSON.parse(body);
  }

  async findUser(email: string) {
    const user = await dbService.findUser(email);
    return user;
  }
}
