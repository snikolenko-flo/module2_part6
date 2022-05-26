import { TEN_MINUTES } from '../data/constants.js';

export class TokenSetting {
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setExpireTime(): void {
    const tokenExpireTime: number = Date.now() + TEN_MINUTES;
    localStorage.setItem('tokenExpireTime', tokenExpireTime.toString());
  }
}
