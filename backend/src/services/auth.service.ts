import { ErrorService } from './error.service.js';

const error = new ErrorService();

export class AuthService {
  async checkAuthorization(req, res) {
    if (!req.headers.authorization) return error.sendAuthError(res);
    if (req.headers.authorization !== 'token') return error.sendWrongTokenError(res);
  }
}
