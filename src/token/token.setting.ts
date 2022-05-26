import { EXPIRATION_TIME } from '../data/constants.js';

export class TokenSetting {
  oneMinuteInMs: number;

  constructor() {
    this.oneMinuteInMs = 60000;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setExpireTime(): void {
    const tokenExpirationTime: number = Date.now() + EXPIRATION_TIME * this.oneMinuteInMs;
    localStorage.setItem('tokenExpireTime', tokenExpirationTime.toString());
  }
}
