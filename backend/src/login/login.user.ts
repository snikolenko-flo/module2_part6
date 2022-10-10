import {User} from '../interfaces/user.js';
import {Request} from 'express';
import {findUserInDB} from '../services/db-service.js';

export class LoginUser {
  async getBody(req: Request): Promise<User> {
    let body = '';
    await req.on('data', (chunk) => {
      body += chunk.toString();
    });
    return JSON.parse(body);
  }

  async findUser(email: string) {
    const user = await findUserInDB(email);
    console.log('db user');
    console.log(user);
    return user;
    //return users.find((user) => user.email == email);
  }
}
